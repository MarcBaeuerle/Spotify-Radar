import { useState, useEffect } from "react";

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

    if (val > 7) {
        result = 'text-2xl';
    } else if (val > 5) {
        result = 'text-3xl';
    } else if (val > 2) {
        result = 'text-5xl';
    } else {
        result = 'text-6xl';
    }

    return result;
}


export default function BottomPanelNode({ test }) {
    const [timer, setTimer] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            setTimer(true);
        }, (test.key + 1) * 250)
    }, [])

    return (
        <div className={`text-center flex flex-col justify-center duration-1000 items-center ${timer ? " opacity-100 " : " opacity-0 "}`}>
            <h4 className={calculateTextSize(test.key) + ' font-normal text-blue-950' }>{test.song.replace('-','(').split('(')[0] || test.song}</h4>
            <p className="text-sm text-black"> {convertArrToReadableString(test.artists)}</p>
        </div>
    )
}

        // <div className={"text-center flex flex-col justify-center duration-700 items-center " + timer ? " opacity-100" : " opacity-0"}>
