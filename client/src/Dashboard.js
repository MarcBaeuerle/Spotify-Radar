import { useState, useEffect} from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: "9bc2ed28c5124518a2b45d4d3d514721",
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (accessToken) return;

        spotifyApi.searchTracks(search).then(res => {
            console.log(res)
        })

    }, [search, accessToken])

    return (
        <div>
            <input type="text" placeholder="Search song/artist" value={search} 
            onChange={e => setSearch(e.target.value)} />
            <div>
                Songs
            </div>
        </div>

    )
}
