import React from "react";

export default function TrackSearchResult({ track }) {
    console.log({track});
    return (
        <div>
            <img src={track.albumURL} style={{ height: '64px', width: '64px' }} />
            <div>
                <h3>{track.title}</h3>
                <h4>{track.artist}</h4>
            </div>
        </div>
    )
}
