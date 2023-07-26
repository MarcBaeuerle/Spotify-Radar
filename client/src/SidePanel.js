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
            <section className="flex flex-col p-6 rounded-3xl bg-blue-950 gap-2 h-fit my-auto w-fit shadow-2xl shadow-blue-950 text-slate-50">
                <h4 className="text-xl">Last Months Averages</h4>
                <hr className="bg-green-500 text-green-500"/>
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
