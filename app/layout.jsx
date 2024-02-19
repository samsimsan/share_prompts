// main layout.jsx


import "@styles/globals.css";


// import { createContext, useState } from "react";
import Head from "next/head"; // Import Head from Next.js
import ThemeProviders from "@providers/ThemeProviders";
import MiddleMan from "./middleMan";

export const metadata = {
    title: "Promptopia",
    description: "Discover and Share AI Prompts",
    icons: {
        icon: [
          {
            media: "(prefers-color-scheme: light)",
            url: "/assets/images/logo.svg",
            href: "/assets/images/logo.svg"
          },
          {
            media: "",
            url: "/assets/images/logo.svg",
            href: "/assets/images/logo.svg"
          }
        ]
      }
}

// export const ThemeContext = createContext();



const RootLayout = ({ children }) => {
    // const [isThemeDark, setIsThemeDark] = useState(false);

    return (
        <html lang="en">
            <Head>
                <title>"this is title"</title> {/* Set title using metadata */}
                <meta name="description" content="Discover and Share AI Prompts" /> {/* Set description */}
                {/* Add other metadata as needed */}
            </Head>
            {/* <ThemeContext.Provider value={{ isThemeDark, setIsThemeDark }}> */}
            <ThemeProviders>
                <MiddleMan>
                    {children}
                </MiddleMan>
            </ThemeProviders>
        </html>
    )
}

export default RootLayout;
