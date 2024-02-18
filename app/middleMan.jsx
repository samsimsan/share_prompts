"use client";

import { useContext } from "react";
import { ThemeContext } from "@providers/ThemeProviders";
import Provider from "@components/Provider"; //for authenication

import Nav from "@components/Nav";

const MiddleMan = ({ children }) => {

    const {isThemeDark} = useContext(ThemeContext);

    return (
        <body className={`${isThemeDark ? "dark_theme" : ""}`}>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    )
}

export default MiddleMan