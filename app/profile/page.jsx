"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();

    //this state will hold all the posts created by the user
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //this is called in the begining to populate the profile page with the creator's existing prompts
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);  //adding ` makes it a dynamic url. 
            const data = await response.json();

            setPosts(data);
        }
        // calling the function here inside useEffect
        if (session?.user.id) fetchPosts();
    }, []); // [] -> It is not depended on changes to any of the states. The effect is called only once when the component is rendered in teh begining.


    const handleEdit = (posts) => {
        router.push(`update-prompt?id=${posts._id}`) //when the user needs to edit the prompt, he will be directed to a different page:
    }

    const handleDelete = async (post) => {
        //confirm if the user really wants to delete it:
        const hasConfirmed = confirm("Are you sure you want to delete this Prompt?");

        //if the hasConfirmed is true
        if (hasConfirmed) {
            try {
                await fetch(`api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = posts.filter((item) => item._id !== post._id);

                window.location.reload(true)

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Profile
            profname={session?.user.name}
            desc="Welcome to your profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile