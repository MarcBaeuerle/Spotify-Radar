import React from "react"

export default function Nav() {
    return (
        <>
            <nav className='z-50 text-blue-950 flex justify-between p-7 font-rale font-bold'>
                <div></div>
                <div className="flex gap-3 sm:gap-4 md:gap-5 text-xl">
                    <button className='h-fulltransform duration-300 p-3 hover:-translate-y-1'>
                        Privacy Policy
                    </button >
                    <div className="bg-black h-4/5 w-0.5 translate-y-1"> </div>
                    <button className='transform duration-300 p-3 hover:-translate-y-1'>
                        About
                    </button >
                </div>
            </nav>
        </>
    )

}
