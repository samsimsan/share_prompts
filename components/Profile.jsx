"use client";

import { useContext } from "react";
import { ThemeContext } from "@app/layout";
import PromptCard from "./PromptCard"

const Profile = ({ profname, desc, data, handleEdit, handleDelete }) => {

  const {isThemeDark} = useContext(ThemeContext);

  return (
    <section className="w-full">
      <h1 className={`${isThemeDark?"head_text_dark":"head_text"} text-left`}>
        <span className={`${isThemeDark?"blue_gradient_dark":"blue_gradient"}`}>{profname}'s </span>
        Profile
      </h1>
      <p className={`mt-5 text-base ${isThemeDark?"text-gray-200":"text-gray-600"} sm:text-lg max-w-2xl text-left`}>{desc}</p>
      <div className="mt-10 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleEditpost={() => handleEdit && handleEdit(post)}
          handleDeletepost={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile