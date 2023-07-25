import React from "react"

export default function Nav({code}) {
    console.log(code)
    return (
        <nav className='flex justify-between p-7'>
            <img src="./client/public/radar.ico" className="h-10" />
            <div className="flex gap-3 sm:gap-4 md:gap-5 text-xl">
                <p className=''>Privacy Policy</p>
                <p className="text-blue-800">|</p>
                <p className=''>About</p>
                {(code) ? <p className="text-blue-800">|</p> : null}
                {(code) ? <p className=''>Log out</p>: null}
            </div>
        </nav>
    )

}
