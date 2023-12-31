"use client";

import { useContext } from "react";
import { ThemeContext } from "./layout";
import Feed from "@components/Feed";


const Home = () => {

    const {isThemeDark} = useContext(ThemeContext);

    return (
        <section className="w-full flex-center flex-col">
            <h1 className={`${isThemeDark?"head_text_dark":"head_text"}  text-center`}>
                Discover and Share
                <span className={`${isThemeDark?"text-indigo-500":"orange_gradient"} text-center`}>
                    <br />
                    AI-Powered Propmts
                </span>
            </h1>
            <p className={` text-center ${isThemeDark?"desc_dark":"desc"}`}>
                Promptopia is an open-source AI prompting tool for modern world
                to discover, create and share creative prompts
            </p>

            <Feed />
        </section>
    )
}

export default Home;