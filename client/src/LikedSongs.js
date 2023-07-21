import { useState, useEffect} from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: "9bc2ed28c5124518a2b45d4d3d514721",
})

let offset = 0;
let artists = new Map();

export default function LikedSongs({ code }) {
    const accessToken = useAuth(code);
    const [totalSongs, setTotalSongs] = useState(0);
    const [artistLists, setArtistLists] = useState([]);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getMySavedTracks({ limit: 20, offset: 0, }).then(res => {
            setTotalSongs(res.body.total);
            console.log(res.body);

            getList(0);
            console.log(artists);
        })
    }, [accessToken]);

    async function getList(index) {
        if (!accessToken) return;
        spotifyApi.getMySavedTracks({ limit: 20, offset: index, }).then(res => {
            res.body.items.map(pos => {
                const name = pos.track.artists[0].name;
                if (artists.has(name)) {
                    artists.set(name, artists.get(name) + 1);
                } else {
                    artists.set(name, 1);
                }
            })
        })
    }


    // useState(() => {
    // }, [accessToken])
    return <h1>{totalSongs} songs</h1>
}

