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

export default function TopTracks({ code }) {
    const accessToken = useAuth(code);
    let shortAverages;
    let longAverages;
    let songNames;
    let myName;

    const [finalData, setFinalData] = useState();

    const getName = async () => {
        spotifyApi.getMe()
            .then(res => {
                myName = res.body.display_name;
            })
    }

    const getTopTracks = async (amount, range) => {
        let popularities = [];
        let tracks = [];
        spotifyApi.getMyTopTracks({ limit: amount, time_range: range })
            .then(res => {
                let trackIDs = [];
                let trackNames = [];
                res.body.items.map(track => {
                    trackIDs.push(track.id);
                    popularities.push(track.popularity || 1);
                    trackNames.push({
                        song: track.name,
                        artists: track.artists.map(arr => {
                            return arr.name;
                        })
                    })
                    return null;
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
                        }

                        if (shortAverages && longAverages) {
                            setFinalData({ s: shortAverages, l: longAverages, n: songNames, m: myName, })
                            gotAverages = true;
                        }
                        return null;
                    }
                    return null;
                })
            })
    }

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return;
        getName();
        getTopTracks(10, "short_term");
        getTopTracks(50, "long_term");
    }, [accessToken]);

    const renderInfo = (val) => {
        let mock;
        let mockName;

        if (!val) {
            let lol = {
                avgDuration: 0,
                avgTempo: 0,
                avgEnergy: 0,
                avgMood: 0,
                avgPopularity: 0,
            }

            mock = { short_term: lol, long_term: lol }
            mockName = '';
        } else {
            mock = { short_term: finalData.s, long_term: finalData.l }
            mockName = (finalData.m + `'s`) || '';
        }


        return (
            <>
                <h1 className="text-5xl text-center py-4 font-bold font-mont text-blue-950">{mockName} Spotify Radar</h1>
                <section className="flex flex-wrap justify-center gap-10 pt-4">
                    <DrawRadar data={mock} />
                    <SidePanel data={mock} />
                </section>
                {val ? <BottomPanel data={finalData.n || null} /> : <div className="h-screen"></div>}
            </>
        )

    }
    return (
        <div>
            {(finalData) ? renderInfo(1) :
                renderInfo(0)}
            <Footer />
        </div>
    )
}

function Footer() {
    return (
        <div className='flex-col text-center pb-7 pt-5'>
            <hr className='my-7 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-blue-950 to-transparent opacity-25 dark:opacity-100 w-1/2 m-auto' />
            <p className='font-light opacity-0'>Built by Marc Baeuerle</p>
            <p className='font-light'>Project Hosted on <a className='underline hover:text-green-600 duration-300'
                href='https://github.com/MarcBaeuerle/Spotify-Radar'>Github</a>
            </p>
        </div>
    )

}
