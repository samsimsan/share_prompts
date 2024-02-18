"use client";

// import { ThemeContext } from "@app/layout";
import { ThemeContext } from "@providers/ThemeProviders";
import Link from "next/link"
import { useContext } from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  const {isThemeDark} = useContext(ThemeContext);

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} post</span>
      </h1>
      <p className={`${isThemeDark?"desc_dark":"desc"} text-left max-w-md`}>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className={`font-satoshi font-semibold text-base ${isThemeDark?"text-gray-200":"text-gray-700"}`}>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className={`font-satoshi font-semibold text-base ${isThemeDark?"text-gray-200":"text-gray-700"}`}>
            Tag <span className="font-normal">(#product, #webdev, #idea)</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        {/* buttons */}
        <div className="flex-end mx-3 mb-5 gap-4">
          {/* cancel button goes to home screen */}
          <Link href="/" className={`${isThemeDark?"text-gray-300 hover:text-white":"text-gray-500 hover:text-gray-900"} text-md font-semibold  transition duration-200 linear`}>
            Cancel
          </Link>

          {/* submit button is dissabled if we are submitting */}
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-md font-semibold bg-primary-orange rounded-full text-white transition duration-200 linear hover:bg-orange-500"
          >
            {submitting ? `${type}...` : type}
          </button>

        </div>
      </form>
    </section>
  )
}

export default Form