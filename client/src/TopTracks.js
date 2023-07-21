import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import DrawRadar from "./DrawRadar";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: "9bc2ed28c5124518a2b45d4d3d514721",
})

const getTopTracks = async (amount, range) => {
    return spotifyApi.getMyTopTracks({ limit: 20, time_range: "long_term" });
}

const getTrackFeatures = async (id) => {
    const data = await spotifyApi.getAudioFeaturesForTrack(id);
    return data;
}


const getScores = (arr) => {
}

const getAverageFeatures = (arr) => {
    let length = arr.length;
    let duration = 0;
    let tempo = 0;
    let energy = 0;
    let mood = 0;
    let popularity = 0;

    arr.forEach(thing => {
        duration += thing.duration;
        tempo += thing.tempo;
        energy += thing.energy;
        mood += thing.mood;
        popularity += thing.popularity;
    })

    return {
        avgDuration: duration / length,
        avgTempo: tempo / length,
        avgEnergy: energy / length,
        avgMood: mood / length,
        avgPopularity: popularity / length,
    }
}

let gotAverages = false;

export default function TopTracks({ code }) {
    const accessToken = useAuth(code);
    const [tracks, setTracks] = useState(new Array());
    const [averages, setAverages] = useState();
    const [scores, setScores] = useState({});

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return;
        getTopTracks(1, "short_term").then(res => {
            res.body.items.map(track => {
                let obj;
                getTrackFeatures(track.id).then((data) => {
                    obj = {
                        name: track.name,
                        artists: track.artists[0].name,
                        energy: data.body.energy,
                        tempo: data.body.tempo,
                        popularity: track.popularity,
                        duration: track.duration_ms,
                        mood: data.body.valence,
                    }
                    setTracks(tracks.push(obj));
                    if (tracks.length === 20) {
                        setAverages(getAverageFeatures(tracks));
                        gotAverages = true;
                    }
                });
            });
        })
    }, [accessToken]);


    return (
        <div>
            Hello there
            {gotAverages ? <DrawRadar obj={averages} /> : 0}

        </div>
        // <div style={{ overflowY: "auto"}}>
        //     {searchResults.map(track => (
        //         <TrackSearchResult track={track} key={track.uri} />
        //     ))}
        // </div>
    )
}
