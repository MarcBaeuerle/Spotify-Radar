import React from "react";

export default function BottomPanelNode({test}) {
    console.log(`BottomPanelNode`);
    return (<div>
        <h4>{test.song}</h4> <p>{test.artists.toString()}</p>
    </div>)
}

