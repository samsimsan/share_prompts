"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../app/layout";
import { signIn, signOut, useSession, getProviders }
  from "next-auth/react";


const Nav = () => {

  const { isThemeDark, setIsThemeDark } = useContext(ThemeContext);

  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    setUpProviders();
  }, [])

  const handleTheme = () => {
    console.log("Theme change please!");
    setIsThemeDark(prev => !prev);
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* logo */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo svg"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className={`${isThemeDark ? "logo_text_dark" : "logo_text"}`}>Promptopia</p>
      </Link>


      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        <button className={`p-2.5 border rounded-xl ${isThemeDark ? "bg-slate-700 border-slate-500 hover:bg-slate-500" : "bg-transparent border-black hover:bg-gray-300"} mr-6`} onClick={handleTheme}>
          {isThemeDark ?
            <Image
              src="/assets/icons/brightness.png"
              alt="Light Icon"
              height={17}
              width={17}
            />
            : <Image
              src="/assets/icons/dark-mode-Icon.png"
              alt="dark Icon"
              height={17}
              width={17}
            />}
        </button>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className={`${isThemeDark?"black_btn_dark":"black_btn"} `}>
              Create Post
            </Link>
            <button type="button" onClick={signOut} className={`${isThemeDark?"outline_btn_dark":"outline_btn"} `}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>

          </div>
        ) :
          (<>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))
            }
          </>)}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        <button className={`p-2.5 border rounded-xl ${isThemeDark ? "bg-slate-700 border-slate-500 hover:bg-slate-500" : "bg-transparent border-gray-300 hover:bg-gray-300"} mr-6`} onClick={handleTheme}>
          {isThemeDark ?
            <Image
              src="/assets/icons/brightness.png"
              alt="Light Icon"
              height={17}
              width={17}
            />
            : <Image
              src="/assets/icons/dark-mode-Icon.png"
              alt="dark Icon"
              height={17}
              width={17}
            />}
        </button>
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown ">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut;
                  }}
                  className="w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (<>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                className="black_btn"
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                Sign In
              </button>
            ))
          }
        </>)}
      </div>
    </nav>
  )
}

export default Nav