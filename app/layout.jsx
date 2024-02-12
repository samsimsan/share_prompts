// main layout.jsx
"use client";

import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { createContext, useState } from "react";
import Head from "next/head"; // Import Head from Next.js

export const metadata = {
    title: "Promptopia",
    description: "Discover and Share AI Prompts"
}

export const ThemeContext = createContext();

const RootLayout = ({ children }) => {
    const [isThemeDark, setIsThemeDark] = useState(false);

    return (
        <html lang="en">
            <Head>
                <title>"this is title"</title> {/* Set title using metadata */}
                <meta name="description" content={metadata.description} /> {/* Set description */}
                {/* Add other metadata as needed */}
            </Head>
            <ThemeContext.Provider value={{ isThemeDark, setIsThemeDark }}>
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
            </ThemeContext.Provider>
        </html>
    )
}

export default RootLayout;
