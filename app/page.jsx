"use client";

import { useContext } from "react";
import ThemeProvider from "@Providers/ThemeProvider";
import Feed from "@components/Feed";


const Home = () => {

    const {isThemeDark} = useContext(ThemeProvider);

    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover and Share
                <span className={`${isThemeDark?"text-red-500":"orange_gradient"} text-center`}>
                    <br />
                    AI-Powered Propmts
                </span>
            </h1>
            <p className="desc text-center">
                Promptopia is an open-source AI prompting tool for modern world
                to discover, create and share creative prompts
            </p>

            <Feed />
        </section>
    )
}

export default Home;