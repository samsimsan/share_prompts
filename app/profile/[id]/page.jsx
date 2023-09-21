"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; //to collect values from the page url - ?name=${post.creator.username}

import Profile from "@components/Profile";

const UserProfile = ({ params }) => { //params can be used to take the value [id] like params.id

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  //useEffect to call the prompts in the user's id:
  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params.id) fetchPosts();
  }, [params.id])

  return (
    <Profile
      profname={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  )
};

export default UserProfile;