"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProviders = ({children}) => {
  
    const [isThemeDark, setIsThemeDark] = useState(false);

    return (
        <ThemeContext.Provider value={{ isThemeDark, setIsThemeDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProviders