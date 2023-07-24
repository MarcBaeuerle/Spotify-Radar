import React, { useEffect } from "react";


function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + "m " + (seconds < 10 ? '0' : '') + seconds + "s";
}

export default function SidePanel({ data }) {
    console.log(`SidePanel`);
    return (
        <>
            <ul>
                <h4>Last Months Averages</h4>
                <li>
                    Duration: {millisToMinutesAndSeconds(data.short_term.avgDuration)}
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
