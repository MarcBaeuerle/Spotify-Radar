import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto';

const MIN_D = 120000; //1 minutes
const MAX_D = 240000; //6.5 minutes
const MIN_T = 40;
const MAX_T = 180;

const clamp = (value, lo, hi) => {
    if (value < lo) {
        return lo;
    }
    return value > hi ? hi : value
}

//jesus christ this is UGLY
//Ill refactor
//...eventually
const computeScores = (data) => {
    let dur = data.avgDuration;
    let tempo = data.avgTempo;
    let energy = data.avgEnergy;
    let pop = data.avgPopularity;
    let mood = data.avgMood;

    return {
        Duration: Math.round(((clamp(dur, MIN_D, MAX_D) - MIN_D) / (MAX_D-MIN_D)) * 100) / 10,
        Tempo: Math.round(((clamp(tempo, MIN_T, MAX_T) - MIN_T) / (MAX_T-MIN_T)) * 100) / 10,
        Popularity: Math.round(pop) / 10,
        Mood: Math.round(((clamp(mood, 0.1, 0.9) - 0.1) / 0.9) * 100) / 10,
        Energy: Math.round(((clamp(energy, 0.1, 0.9) - 0.1) / 0.9) * 100) / 10,
    }

}

export default function DrawRadar({ data }) {
    console.log(data);
    console.log(`DrawRadar`);
    const [trackData, setTrackData] = useState({
        labels: ['Duration', 'Tempo', 'Popularity', 'Mood', 'Energy'], 
        datasets: [{
            label: "Last Month",
            data: Object.values(computeScores(data.short_term)),
            backgroundColor: 'rgba(30, 215, 96, 0.2)',
            borderColor: 'rgb(19, 145, 64)',
            pointBackgroundColor: 'rgb(19, 145, 64)',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(19, 145, 64)'
        }, {
                label: "All Time",
                data: Object.values(computeScores(data.long_term)) || null,
                backgroundColor: 'rgba(209, 131, 21, 0.2)',
                borderColor: 'rgb(209, 131, 21)',
                pointBackgroundColor: 'rgb(209, 131, 21)',
                pointBorderColor: '#000',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(209, 131, 21)'
            }]
    })

    return (
        <Radar data={trackData} options={{
            scales: {
                r: {
                    ticks: { //Removes numbers
                        display: false,
                    },
                    angleLines: {
                        color: 'black',
                    },
                    pointLabels: {
                        font: {
                            size: 17,
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 10,
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 15,
                        }
                    }
                }
            }
        }} />
    )
}
