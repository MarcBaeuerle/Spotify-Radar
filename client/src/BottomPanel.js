import React, { useState } from "react";
import BottomPanelNode from "./BottomPanelNode";



export default function BottomPanel({ data }) {
    console.log(`BottomPanel`);
    const [omfg, setOmfg] = useState(data)
    return (
        <div>
            <div className="flex flex-col gap-2 w-1/2 m-auto">
                {omfg.map((arr, i) => {
                    return <BottomPanelNode test={{ song: arr.song, artists: arr.artists, key: i }} key={i} />
                })}
            </div>
        </div>
    )
}
