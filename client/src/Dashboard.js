import { useState, useEffect} from "react";
import useAuth from "./useAuth";
import TrackSearchResult from "./TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: "9bc2ed28c5124518a2b45d4d3d514721",
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    console.log(searchResults);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return;
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image;
                    return smallest;
                }, track.album.images[0]);
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumURL: smallestAlbumImage.url,
                }
            }))
        })
        return () => cancel = true;
    }, [search, accessToken])

    return (
        <div>
            <input type="text" placeholder="Search song/artist" value={search} 
            onChange={e => setSearch(e.target.value)} />
            <div style={{ overflowY: "auto"}}>
                {searchResults.map(track => (
                    <TrackSearchResult track={track} key={track.uri} />
                ))}
            </div>
        </div>

    )
}
