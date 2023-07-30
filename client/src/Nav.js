import React, { useState } from "react"

export default function Nav({code, privBtn, homeBtn}) {
    let AUTH_URL =
        `https://accounts.spotify.com/authorize?client_id=9bc2ed28c5124518a2b45d4d3d514721&response_type=code&redirect_uri=https://spotifyradar.netlify.app/&scope=user-read-private%20user-top-read&show_dialog=${(localStorage.getItem('logged-in'))}`


    const [openMenu, setOpenMenu] = useState(false);
    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }

    const logOutButton = (
        <a onClick={() => {localStorage.setItem("logged-in", true);}} href="/" className='transform duration-300 p-3 hover:-translate-y-1'>
            Log out
        </a >
    );

    const logInButton = (
        <a href={AUTH_URL} className='transform duration-300 p-3 hover:-translate-y-1'>
            Log in
        </a >
    )

    const homeButton = (
        <div onClick={() => {homeBtn()}}  className='cursor-pointer transform duration-300 p-3 hover:-translate-y-1'>
            Home
        </div >
    )

    const privacyPolicyButton = (
        <div onClick={() => {privBtn()}} className='cursor-pointer h-fulltransform duration-300 p-3 hover:-translate-y-1'>
            Privacy Policy
        </div >
    )

    return (
        <>
            <div className={`${openMenu ? ' opacity-100 ' : ' opacity-0 '} duration-500 ease-in-out flex flex-col z-0 sm:hidden text-blue-950 font-rale font-bold text-xl absolute w-full h-fit bg-red-100 p-7 shadow-xl text-center`}>
                {homeButton}
                {privacyPolicyButton}
                {code ? (logOutButton) : (logInButton)}
            </div>
            <nav className='z-50 text-blue-950 flex mr-0 ml-auto p-7 font-rale font-bold relative w-fit'>
                <div onClick={toggleMenu} className="flex flex-col gap-2 p-3 sm:hidden align-middle cursor-pointer">
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                </div>

                <div className="hidden sm:flex gap-3 sm:gap-4 md:gap-5 text-xl">
                    {homeButton}
                    <div className="bg-black h-4/5 w-0.5 translate-y-1"></div>
                    {privacyPolicyButton}
                    <div className="bg-black h-4/5 w-0.5 translate-y-1"></div>
                    {code ? (logOutButton) : (logInButton)}
                </div>
            </nav>
        </>
    )

}

