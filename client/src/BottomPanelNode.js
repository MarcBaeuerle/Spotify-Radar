import React from "react";

function convertArrToReadableString(arr) {
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0].toString();

    return arr.reduce((prevText, nextNum, i, array) => {
        const isLastItem = i === array.length - 1;
        const delimiter = isLastItem ? ', and' : ',';
        return `${prevText}${delimiter} ${nextNum}`;
    });
} 

function calculateTextSize(val) {
    let result = ``;

    if (val > 6) {
        result = 'text-3xl';
    } else if (val > 2) {
        result = 'text-5xl';
    } else {
        result = 'text-6xl';
    }

    return result;
}

export default function BottomPanelNode({ test }) {
    return (
        <div className="text-center flex flex-col justify-center items-center">
            <h4 className={calculateTextSize(test.key)}>{test.song.split('(')[0]}</h4> 
            <p className="text-sm"> {convertArrToReadableString(test.artists)}</p>
        </div>
    )
}
