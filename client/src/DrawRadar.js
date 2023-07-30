import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';

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
        Duration: Math.round(((clamp(dur, MIN_D, MAX_D) - MIN_D) / (MAX_D - MIN_D)) * 100) / 10,
        Tempo: Math.round(((clamp(tempo, MIN_T, MAX_T) - MIN_T) / (MAX_T - MIN_T)) * 100) / 10,
        Popularity: Math.round(pop) / 10,
        Mood: Math.round(((clamp(mood, 0.1, 0.9) - 0.05) / 0.9) * 100) / 10,
        Energy: Math.round(((clamp(energy, 0.1, 0.9) - 0.1) / 0.9) * 100) / 10,
    }

}

export default function DrawRadar({ data }) {
    const chartData = {
        labels: ['Duration', 'Tempo', 'Popularity', 'Mood', 'Energy'],
        datasets: [{
            label: "Last Month",
            data: Object.values(computeScores(data.short_term)) || null,
            backgroundColor: 'rgba(30, 215, 96, 0.3)',
            borderColor: 'rgb(19, 145, 64)',
            pointBackgroundColor: 'rgb(19, 145, 64)',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(19, 145, 64)'
        }, {
            label: "All Time",
            data: Object.values(computeScores(data.long_term)) || null,
            backgroundColor: 'rgba(37,76,218, 0.2)',
            borderColor: 'rgb(15, 30, 87)',
            pointBackgroundColor: 'rgb(15, 30, 87)',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(15, 30, 87)'
        }]
    }

    return (
        <div className="w-5/6 aspect-square sm:w-1/2 md:w-2/5 max-w-md">
            <Radar data={chartData} options={{
                scales: {
                    r: {
                        ticks: { //Removes numbers
                            display: false,
                        },
                        angleLines: {
                            color: 'black',
                        },
                        pointLabels: {
                            color: 'black',
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
                                size: 16,
                            }
                        }
                    }
                }
            }} />
        </div>
    )
}
