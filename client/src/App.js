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
            {false ? <Nav /> : 
                <div className='h-14'>
                </div>
            }

            {code ? <TopTracks code={code} /> : <Login />}
            {code ? 
                <div className='flex-col text-center pb-7 pt-5'>
                    <hr className='my-7 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-blue-950 to-transparent opacity-25 dark:opacity-100 w-1/2 m-auto' />
                    <p className=''>Project Hosted on <a className='underline hover:text-green-600 duration-300'
                        href='https://github.com/MarcBaeuerle/Spotify-Radar'>Github</a>
                    </p>
                </div>
            : null }
        </div>
    )
}


export default App;
