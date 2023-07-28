import React, { useState } from "react"

export default function Nav({code}) {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }

    const logOutButton = (
                    <button onClick={() => window.location.reload(false)} className='transform duration-300 p-3 hover:-translate-y-1'>
                        Log out
                    </button >
    );

    const homeButton = (
                    <button className='transform duration-300 p-3 hover:-translate-y-1'>
                        Home
                    </button >
    )

    const aboutButton = (
        <button onClick={toggleMenu} className='transform duration-300 p-3 hover:-translate-y-1'>
            About
        </button >

    )

    const privacyPolicyButton = (
                <button onClick={toggleMenu} className='h-fulltransform duration-300 p-3 hover:-translate-y-1'>
                    Privacy Policy
                </button >
    )

    return (
        <>
            <div className={`${openMenu ? ' opacity-100 ' : ' opacity-0 '} duration-500 ease-in-out flex flex-col z-0 sm:hidden text-blue-950 font-rale font-bold text-xl absolute w-full h-fit bg-red-100 p-7 shadow-xl`}>
                {code ?  logOutButton : homeButton }
                {aboutButton}
                {privacyPolicyButton}
            </div>
            <nav className='z-50 text-blue-950 flex mr-0 ml-auto p-7 font-rale font-bold relative w-fit'>
                <div onClick={toggleMenu} className="flex flex-col gap-2 p-3 sm:hidden align-middle cursor-pointer">
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                    <span className="bg-black h-1 w-10 rounded-full block"></span>
                </div>

                <div className="hidden sm:flex gap-3 sm:gap-4 md:gap-5 text-xl">
                    {code ?  logOutButton : homeButton }
                    <div className="bg-black h-4/5 w-0.5 translate-y-1"></div>
                    {aboutButton}
                    <div className="bg-black h-4/5 w-0.5 translate-y-1"></div>
                    {privacyPolicyButton}
                </div>
            </nav>
        </>
    )

}

