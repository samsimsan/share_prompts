"use client";

import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const metadata = {
    title: "Promptopia",
    description: "Discover and Share AI Prompts"
}

const RootLayout = ({ children }) => {

    const [isThemeDark, setIsThemeDark] = useState(false);

    return (
        <ThemeContext.Provider value={{isThemeDark, setIsThemeDark}}>
            <html lang="en">
                <body className={`${isThemeDark?"dark_theme":""}`}>
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
            </html>
        </ThemeContext.Provider>
    )
}

export default RootLayout;