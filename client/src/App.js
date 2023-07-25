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
        <div className='bg-green-100 relative'>
            {code ? <Nav code={true} /> : <Nav code={false} />}
            {code ? <TopTracks code={code} /> : <Login />}
            <div className='flex-col text-center py-7 bg-sky-100'>
                <p>Built by Marc Baeuerle</p>
                <p className=''>Project Hosted on <a className='underline hover:text-gray-500'
                    href='https://github.com/MarcBaeuerle/Spotify-Radar'>Github</a>
                </p>
            </div>
        </div>
    )
}


export default App;
