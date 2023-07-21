import Login from './Login';
// import Dashboard from './Dashboard';
import LikedSongs from './LikedSongs';
import TopTracks from './TopTracks';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return code ? <TopTracks code={code} /> : <Login />
}


export default App;
