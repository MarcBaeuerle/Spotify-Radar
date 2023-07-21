import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto';

const MIN_D = 60000; //1 minutes
const MAX_D = 390000; //6.5 minutes
const MIN_T = 20;
const MAX_T = 200;

const clamp = (value, lo, hi) => {
    if (value < lo) {
        return lo;
    }
    return value > hi ? hi : value
}

const computeScores = (o) => {
    let dur = o.obj.avgDuration;
    let tempo = o.obj.avgTempo;
    let energy = o.obj.avgEnergy;
    let pop = o.obj.avgPopularity;

    //jesus christ this is UGLY
    //Ill refactor
    //...eventually
    return {
        Duration: Math.round(((clamp(dur, MIN_D, MAX_D) - MIN_D) / (MAX_D-MIN_D)) * 100) / 10,
        Tempo: Math.round(((clamp(tempo, MIN_T, MAX_T) - MIN_T) / (MAX_T-MIN_T)) * 100) / 10,
        Mood: Math.round(o.obj.avgMood * 100) / 10,
        Popularity: Math.round(pop) / 10,
        Energy: Math.round(energy * 100) / 10,
    }

}

export default function DrawRadar(obj) {
    const [graphData, setGraphData] = useState({
        labels: ['Duration', 'Tempo', 'Popularity', 'Mood', 'Energy'], 
        datasets: [{
            label: "Your stats",
            data: Object.values(computeScores(obj)),
        }]
    })
    console.log(`Radar`);
    console.log(computeScores(obj));
    return (
        <Radar data={graphData} options={{
            scales: {
                r: {
                    min: 0,
                    max: 10,
                }
            }
        }} />
    )
}
