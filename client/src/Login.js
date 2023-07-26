import React from 'react';

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=9bc2ed28c5124518a2b45d4d3d514721&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-top-read"

export default function Login() {
    return (
        <section className='-z-10 absolute flex h-screen w-screen top-0'>
            <div className='z-30 m-auto font-rale rounded-3xl h-96 w-80 bg-blue-950 text-gray-200 p-7 flex flex-col items-center justify-around shadow-2xl shadow-black'>
                <h1 className='text-3xl font-mont'>Spotify Radar</h1>
                <div className='flex flex-col items-center'>
                    <h4 className='text-center'>Your personal Spotify listening habits all in one
                        digestable chart.
                    </h4>
                    <h4 className=''>Login below to get started</h4>
                </div>
                <a href={AUTH_URL} className='bg-green-500 hover:bg-blue-950 hover:text-white hover:border-green-500 border-2 border-blue-950 text-black font-extrabold py-3 px-6 w-fit relative rounded-xl'>
                    Login with Spotify
                </a>
                <div className='items-center flex flex-col text-sm'>
                    <p className=''>Built by Marc Baeuerle</p>
                    <p className=''>Project Hosted on <a className='underline duration-200 hover:text-green-500'
                        href='https://github.com/MarcBaeuerle/Spotify-Radar'>Github</a>
                    </p>
                </div>
            </div>
        </section>
    )
}
