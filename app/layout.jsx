import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

import ThemeProvider from "@Providers/ThemeProvider";

export const metadata = {
    title: "Promptopia",
    description: "Discover and Share AI Prompts"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <ThemeProvider>
                        <div className="main">
                            <div className="gradient" />
                        </div>
                        <main className="app">
                            <Nav />
                            {children}
                        </main>
                    </ThemeProvider>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;