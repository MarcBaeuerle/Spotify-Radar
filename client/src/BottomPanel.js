import React, { useState } from "react";
import BottomPanelNode from "./BottomPanelNode";



export default function BottomPanel({ data }) {
    console.log(`BottomPanel`);
    const [omfg, setOmfg] = useState(data)
    return (
        <div>
            <div className="flex flex-col pt-2 sm:pt-0 gap-2 w-4/5 m-auto pb-3 sm:w-1/2">
                {omfg.map((arr, i) => {
                    return <BottomPanelNode test={{ song: arr.song, artists: arr.artists, key: i }} key={i} />
                })}
            </div>
        </div>
    )
}
