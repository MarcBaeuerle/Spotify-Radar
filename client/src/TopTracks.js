import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import DrawRadar from "./DrawRadar";
import SpotifyWebApi from "spotify-web-api-node";
import SidePanel from "./SidePanel";
import BottomPanel from "./BottomPanel";

const spotifyApi = new SpotifyWebApi({
    clientId: "9bc2ed28c5124518a2b45d4d3d514721",
})

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
    console.log(`TopTracks`);
    const accessToken = useAuth(code);
    const [shortAverages, setShortAverages] = useState();
    const [longAverages, setLongAverages] = useState();
    const [songNames, setSongNames] = useState();

    const getTopTracks = async (amount, range) => {
        let popularities = new Array();
        let tracks = new Array();
        spotifyApi.getMyTopTracks({ limit: amount, time_range: range })
            .then(res => {
                let trackIDs = new Array();
                let trackNames = new Array();
                res.body.items.map(track => {
                    trackIDs.push(track.id);
                    console.log(`${range} ${track.popularity}`);
                    popularities.push(track.popularity || 1);
                    trackNames.push({
                        song: track.name,
                        artists: track.artists.map(arr => {
                            return arr.name;
                        })
                    })
                })

                console.log(popularities);

                if (range === "short_term") setSongNames(trackNames);
                return trackIDs;
            })
            .then(res => spotifyApi.getAudioFeaturesForTracks(res))
            .then(data => {
                data.body.audio_features.map((track,index) => {
                    tracks.push( {
                        energy: track.energy,
                        tempo: track.tempo,
                        popularity: popularities[index],
                        duration: track.duration_ms,
                        mood: track.valence,
                    });
                    if (tracks.length === amount) {
                        let result = getAverageFeatures(tracks);
                        gotAverages = true;
                        tracks = [];
                        popularities = [];
                        (range === "short_term") ? setShortAverages(result) : setLongAverages(result);
                        return;
                    }
                })
            })
    }

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return;
        getTopTracks(10, "short_term");
        getTopTracks(50, "long_term");

        // gotAverages = true;
        // setShortAverages({
        //     avgDuration : 201612.5,
        //     avgEnergy : 0.6743,
        //     avgMood : 0.34043,
        //     avgPopularity : 76.5,
        //     avgTempo : 118.82220000000002,
        // });
        //
        // setLongAverages( {
        //     avgDuration : 189473.44,
        //     avgEnergy : 0.5759000000000001,
        //     avgMood : 0.5131199999999998,
        //     avgPopularity : 58.2,
        //     avgTempo : 117.53337999999997,
        // });
        
    }, [accessToken]);

    return (
        <div style={{height: 500, width: 500,}}>
            Hello there
            {(gotAverages && shortAverages && longAverages) ? <DrawRadar data={{short_term: shortAverages, long_term: longAverages,}} /> : 0}
            {(gotAverages && shortAverages && longAverages) ? <SidePanel data={{short_term: shortAverages, long_term: longAverages,}} /> : 0}
            {(gotAverages && shortAverages && longAverages) ? <BottomPanel data={songNames} /> : 0}
        </div>

    )
}

