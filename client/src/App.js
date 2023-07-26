import Login from './Login';
import TopTracks from './TopTracks';
import Nav from './Nav';

const code = new URLSearchParams(window.location.search).get('code');


function App() {
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
                {true ? <Nav /> : null}
                {code ? <TopTracks code={code} /> : <Login />}
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


export default App;
