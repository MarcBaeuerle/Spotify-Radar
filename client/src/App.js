import Login from './Login';
import useAuth from "./useAuth";
import TopTracks from './TopTracks';
import { useEffect } from 'react';
import SpotifyWebApi from "spotify-web-api-node";
import Nav from './Nav';

const code = new URLSearchParams(window.location.search).get('code');


function App() {
    console.log(`App`);
    
    return (
        <div className='relative bg-neutral-100'>
            {code ? <Nav code={true} /> : <Nav code={false} />}
            {code ? <TopTracks code={code} /> : <Login />}
            {code ? 
                <div className='flex-col text-center pb-7 pt-5'>
                    <hr className='my-7 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-blue-800 to-transparent opacity-25 dark:opacity-100 w-1/3 m-auto' />
                    <p>Built by Marc Baeuerle</p>
                    <p className=''>Project Hosted on <a className='underline hover:text-gray-500'
                        href='https://github.com/MarcBaeuerle/Spotify-Radar'>Github</a>
                    </p>
                </div>
            : null }
        </div>
    )
}


export default App;
