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
            <section className="flex flex-col bg-red-400 p-6 rounded-3xl border-black border-2 gap-2 h-fit my-auto">
                <h4 className="text-xl">Last Months Averages</h4>
                <hr className="bg-black"/>
                <div className="flex gap-4">
                    <div>
                        <p>Duration:</p>
                        <p>Tempo:</p>
                        <p>Popularity:</p>
                        <p>Mood:</p>
                        <p>Energy:</p>
                    </div>
                    <div>
                        <p>{millisToMinutesAndSeconds(data.short_term.avgDuration)} </p>
                        <p>{Math.floor(data.short_term.avgTempo)} bpm </p>
                        <p>{Math.round(data.short_term.avgPopularity * 1) / 10} / 10 </p>
                        <p>{Math.round(data.short_term.avgMood * 100) / 10} / 10 </p>
                        <p>{Math.round(data.short_term.avgEnergy * 100) / 10} / 10 </p>
                    </div>
                </div>


            </section>
        </>
    )

}
