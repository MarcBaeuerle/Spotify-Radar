import React from "react"

export default function Nav({code}) {
    console.log(code)
    return (
        <nav className='bg-blue-500 flex justify-center p-7'>
            <p className=''>Spotify Radar</p>
            <p className=''>About</p>
            <p className=''>Privacy Policy</p>
        </nav>
    )

}
