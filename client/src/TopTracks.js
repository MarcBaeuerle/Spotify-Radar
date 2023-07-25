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
    let shortAverages;
    let longAverages;
    let songNames;

    const [finalData, setFinalData] = useState();

    const getTopTracks = async (amount, range) => {
        let popularities = new Array();
        let tracks = new Array();
        spotifyApi.getMyTopTracks({ limit: amount, time_range: range })
            .then(res => {
                let trackIDs = new Array();
                let trackNames = new Array();
                res.body.items.map(track => {
                    trackIDs.push(track.id);
                    popularities.push(track.popularity || 1);
                    trackNames.push({
                        song: track.name,
                        artists: track.artists.map(arr => {
                            return arr.name;
                        })
                    })
                })

                if (range === "short_term") songNames = trackNames;
                return trackIDs;
            })
            .then(res => spotifyApi.getAudioFeaturesForTracks(res))
            .then(data => {
                data.body.audio_features.map((track, index) => {
                    tracks.push({
                        energy: track.energy,
                        tempo: track.tempo,
                        popularity: popularities[index],
                        duration: track.duration_ms,
                        mood: track.valence,
                    });
                    if (tracks.length === amount) {
                        let result = getAverageFeatures(tracks);
                        tracks = [];
                        popularities = [];
                        if (range === "short_term") {
                            shortAverages = result;
                        } else {
                            longAverages = result;
                            setFinalData({ s: shortAverages, l: longAverages, n: songNames })
                            gotAverages = true;
                            console.log(finalData);
                        }
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
    }, [accessToken]);

    const renderInfo = (val) => {
        let mock;
        if (!val) {
            let lol = {
                avgDuration: 0,
                avgTempo: 0,
                avgEnergy: 0,
                avgMood: 0,
                avgPopularity: 0,
            }

            mock = { short_term: lol, long_term: lol }
        } else {
            mock = { short_term: finalData.s, long_term: finalData.l }
        }


        return (
            <>
                <section className="flex flex-wrap justify-center gap-10 bg-red-100 pt-10">
                    <DrawRadar data={mock} />
                    <SidePanel data={mock} />
                </section>
                {val ? <BottomPanel data={finalData.n || null} /> : null}
            </>
        )

    }
    return (
        <div>
            {(gotAverages) ? renderInfo(1) :
                renderInfo(0)}
        </div>
    )
}

