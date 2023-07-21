import Login from './Login';
// import Dashboard from './Dashboard';
import LikedSongs from './LikedSongs';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return code ? <LikedSongs code={code} /> : <Login />
}


export default App;
