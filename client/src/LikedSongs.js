import { useState, useEffect} from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: "9bc2ed28c5124518a2b45d4d3d514721",
})

export default function LikedSongs({ code }) {
    const accessToken = useAuth(code);
    const [totalSongs, setTotalSongs] = useState(0);
    const [offset, setOffset] = useState(0);
    const [artistLists, setArtistLists] = useState(new Map());
    const [totalArtists, setTotalArtists] = useState(0);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getMySavedTracks({ limit: 1, offset: 0, }).then(res => {
            setTotalSongs(res.body.total);
        })
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return;
        if (!totalSongs) return;
        console.log(`offset is: ${offset}`);
        getArtists(offset);
        setOffset(offset + 20);
    }, [totalSongs, artistLists, totalArtists]);


    function getArtists(index) {
        if (!accessToken) return;
        spotifyApi.getMySavedTracks({ limit: 20, offset: index, })
            .then(res => {
                res.body.items.map(pos => {
                    const name = pos.track.artists[0].name;
                    console.log(name);
                    if (artistLists.has(name)) {
                        setArtistLists(artistLists.set(name, artistLists.get(name) + 1));
                        setTotalArtists(totalArtists + 1);
                    } else {
                        setArtistLists(artistLists.set(name, 1));
                    }
                })
            })
            .then(res => {
                console.log(artistLists);
                const sortNumAsc = new Map([...artistLists].sort((a, b) => b[1] - a[1]));
                console.log(sortNumAsc);
            })
    }


    // async function getList(index) {
    //     if (!accessToken) return;
    //     spotifyApi.getMySavedTracks({ limit: 20, offset: index, }).then(res => {
    //         res.body.items.map(pos => {
    //             const name = pos.track.artists[0].name;
    //             if (artists.has(name)) {
    //                 artists.set(name, artists.get(name) + 1);
    //             } else {
    //                 artists.set(name, 1);
    //             }
    //         })
    //     })
    // }
    // useState(() => {
    // }, [accessToken])
    return <h1>{totalSongs} songs</h1>
}

