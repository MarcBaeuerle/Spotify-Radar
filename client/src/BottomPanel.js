import React, { useState } from "react";
import BottomPanelNode from "./BottomPanelNode";



export default function BottomPanel({data}) {
    console.log(`BottomPanel`);
    const [omfg, setOmfg] = useState(data)
    return (
        <div>
            {omfg.map((arr, i) => {
                return <BottomPanelNode test={{song: arr.song, artists: arr.artists}} key={i} / >
            })}
        </div>
    )
}
