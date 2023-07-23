import React, { useEffect } from "react";

export default function SidePanel({ data }) {
    console.log(`SidePanle`);
    console.log(data);

    return (
        <>
            <ul>
                <li>
                    Last Month
                </li>
                <li>
                    Duration: {data.short_term.avgDuration / 1000}s
                </li>
                <li>
                    Energy: {data.short_term.avgEnergy}
                </li>
                <li>
                    Mood: {data.short_term.avgMood}
                </li>
                <li>
                    Popularity: {Math.round(data.short_term.avgPopularity) / 10}
                </li>
                <li>
                    Tempo: {Math.floor(data.short_term.avgTempo)} bpm
                </li>
            </ul>
            <ul>
                <li>
                    All Time
                </li>
                <li>
                    Duration: {data.long_term.avgDuration / 1000}s
                </li>
                <li>
                    Energy: {data.long_term.avgEnergy}
                </li>
                <li>
                    Mood: {data.long_term.avgMood}
                </li>
                <li>
                    Popularity: {Math.round(data.long_term.avgPopularity) / 10}
                </li>
                <li>
                    Tempo: {Math.floor(data.long_term.avgTempo)} bpm
                </li>
            </ul>
        </>
    )

}
