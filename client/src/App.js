import { useState } from 'react';
import TopTracks from './TopTracks';
import Nav from './Nav';

const code = new URLSearchParams(window.location.search).get('code');


export default function App() {

    const [displayPrivacy, setDisplayPrivacy] = useState(false);
    

    function toggleDisplay(val) {
        setDisplayPrivacy(val);
    }

    if (code) {
        localStorage.setItem("logged-in", false);
    }

    return (
        <>
            <Background code={code} />
            <Nav code={code} privBtn={() => toggleDisplay(true)} homeBtn={() => toggleDisplay(false)}/>

            {code ? 
                <div className={`${displayPrivacy ? 'hidden' : 'block'}`}>
                    <TopTracks code={code} /> 
                </div> : 
                <div className={`${displayPrivacy ? 'hidden' : 'block'}`}>
                <Login />
                </div>}


            {displayPrivacy ? <PrivacyPolicy /> : null}
        </>
    )
}

function Background({ code }) {
    function randomBackground() {
        const d = new Date();
        let time = d.getHours();
        let string = ' noise';
        return string + ((time) % 4) + '';
    }

    return (
        <div className={`-z-50 ${randomBackground(3)} duration-1000 h-screen w-full fixed top-0 opacity-40 ${code ? ' brightness-100 ' : ' brightness-75 '}`}></div>
    )

}

function Login() {
    let AUTH_URL =
        `https://accounts.spotify.com/authorize?client_id=9bc2ed28c5124518a2b45d4d3d514721&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-top-read&show_dialog=${(localStorage.getItem('logged-in') || true)}`


    return (
        <section className='relative flex h-fit w-full'>
            <div className='z-30 mx-auto my-32 font-rale rounded-3xl h-96 w-80 bg-blue-950 text-gray-200 p-7 flex flex-col items-center justify-around shadow-2xl shadow-black'>
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

function PrivacyPolicy() {
    return (
        <section className='-z-10 relative flex h-fit w-full'>
            <div className='w-4/5 h-fit z-30 mx-auto my-16 sm:w-3/4 md:w-2/3 lg:w font-rale rounded-3xl bg-blue-950 text-gray-200 p-10 gap-7 leading-6 flex flex-col shadow-2xl shadow-black'>
                <h1 className='text-center text-3xl font-mont'>Privacy policy</h1>
                <div>
                    <p className=''>By logging into spotify through this site, you are agreeing to provide the following information in order to show your stats: </p>
                    <ul className='pl-10 list-disc'>
                        <li>Your most played songs</li>
                        <li>Your account name</li>
                    </ul>
                </div>
                <p>None of the data used from Spotify is being stored or shared with third parties. All the information obtained is used solely for displaying you average listening stats and top songs of the month. </p>
                <p>If you would like to remove this sites permission from fetching your data through Spotifies developer API, then you can visit <a className='underline hover:text-green-500 duration-200' href='https://www.spotify.com/us/account/apps/'>this page</a> and remove "Spotify Radar"'s access.</p>

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

