import React, { useEffect } from "react";

export default function SidePanel({ data }) {
    console.log(`SidePanle`);
    console.log(data);

    return (
        <>
            <ul>
                <h4>Last Months Stats</h4>
                <li>
                    Duration: {data.short_term.avgDuration / 1000}s
                </li>
                <li>
                    Tempo: {Math.floor(data.short_term.avgTempo)} bpm
                </li>
                <li>
                    Popularity: {Math.round(data.short_term.avgPopularity * 1) / 10} / 10
                </li>
                <li>
                    Mood: {Math.round(data.short_term.avgMood * 100) / 10} / 10
                </li>
                <li>
                    Energy: {Math.round(data.short_term.avgEnergy * 100) / 10} / 10
                </li>
            </ul>
        </>
    )

}
