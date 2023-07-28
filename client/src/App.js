import { useState } from 'react';
import TopTracks from './TopTracks';
import Nav from './Nav';

const code = new URLSearchParams(window.location.search).get('code');

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=9bc2ed28c5124518a2b45d4d3d514721&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-top-read"

export default function App() {
    console.log(`App`);

    function randomBackground() {
        const d = new Date();
        let time = d.getHours();
        let string = ' noise';
        return string + ((time) % 4) + '';
    }

    return (
        <>
            <div className={`-z-10 ${randomBackground(3)} duration-1000 h-screen w-full fixed top-0 opacity-40 ${code ? ' brightness-100 ' : ' brightness-75 '}`}></div>
            <div className='relative z-20'>

                {code ? <Nav code={true} /> : <Nav code={false} />}

                {code ? <TopTracks code={code} /> : <Login /> }

                {code ?
                    <div className='flex-col text-center pb-7 pt-5'>
                        <hr className='my-7 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-blue-950 to-transparent opacity-25 dark:opacity-100 w-1/2 m-auto' />
                        <p className='font-light'>Built by Marc Baeuerle</p>
                        <p className='font-light'>Project Hosted on <a className='underline hover:text-green-600 duration-300'
                            href='https://github.com/MarcBaeuerle/Spotify-Radar'>Github</a>
                        </p>
                    </div>
                    : null}
            </div>
        </>
    )
}

function Login() {
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

function About() {
    console.log(`ABOUT`);
    return (
                <div className='z-50 bg-purple-600 h-20 w-20'> 
                    About section 
                </div>
    )
}

function PrivacyPolicy() {
    return (
                <div> 
                    Privacy Policy 
                </div>
    )
}

