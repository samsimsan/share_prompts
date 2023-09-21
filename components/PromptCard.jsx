"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, prompthandleTagsAreClicked, handleEditpost, handleDeletepost }) => {

  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    console.log(post);
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`); // goes to the page.jsx in profile/[id] folder
  };

  const handleShowTags = () => {
    const strTag = post.tag;
    let tags = strTag.substr(0).split(",")
    tags = tags.map((t) => {
      return t.trim()
    })
    return (tags.map((tag, index) => {
      return (
        <p key={index} className="font-inter text-sm text-cyan-700 cursor-pointer inline px-0.5 hover:underline underline-offset-4 "
          onClick={(e) => {
            prompthandleTagsAreClicked && prompthandleTagsAreClicked(tag)
          }}
        >
          #{tag}
        </p>);
    }))


  }

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt); //this is used to write the text to the clipboard.
    setTimeout(() => setCopied(""), 3000); //reset the setCopied after 3 sec. -> for changing back the copy symbol
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => { handleCopy() }} >
          <Image
            src={copied === post.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"}
            alt="no"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <>

        {handleShowTags()}
      </>
      {/* we show the edit and delete buttons if the session is active and the pathname is ./profile */}
      {
        session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3
        ">
            <p
              className="font-inter text-sm green_gradient cursor-pointer hover:text-green-500"
              onClick={handleEditpost}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer hover:text-orange-500"
              onClick={handleDeletepost}
            >
              Delete
            </p>
          </div>
        )
      }
    </div >
  )
}

export default PromptCard;