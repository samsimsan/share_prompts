'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePromt = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);   //turned true when we need to submit a new prompt
  const [post, setPost] = useState({   //will contain the info regarding the prompt
    prompt: "",
    tag: ""
  });

  //this calls our api to create the new post:
  const createPromt = async (e) => {
    setSubmitting(true);
    e.preventDefault(); // to prevent the default reloading of the page when the form is submitted.

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }

  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPromt}
    />
  )
}

export default CreatePromt