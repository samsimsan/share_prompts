'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
    const searchParams = useSearchParams() // to take the parameters passed in the url like ?id=123123
    const promptId = searchParams.get("id");

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);   //turned true when we need to submit a new prompt
    const [post, setPost] = useState({   // this state will hold the data regarding the prompt whose edit button was clicked.
        prompt: "",
        tag: ""
    });

    useEffect(() => {

        const getPromptDetails = async () => {
            const response = await fetch(`api/prompt/${promptId}`);
            const data = await response.json();
            
            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }

        //we only call this function if the promptId exists
        if (promptId) getPromptDetails();

    }, [promptId])

    const editPrompt = async (e) => {
        setSubmitting(true);
        e.preventDefault(); // to prevent the default reloading of the page when the form is submitted.

        if (!promptId) return alert("Missing PromptId");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push("/")
            }
        } catch (error) {
        } finally {
            setSubmitting(false);
        }

    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        />
    )
}

export default EditPrompt