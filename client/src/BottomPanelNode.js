import React from "react";

export function convertArrToReadableString(arr) {
	if (arr.length === 0) return '';
	if (arr.length === 1) return arr[0].toString();

	return arr.reduce((prevText, nextNum, i, array) => {
		const isLastItem = i === array.length - 1;
		const delimiter = isLastItem ? ', and' : ',';
		return `${prevText}${delimiter} ${nextNum}`;
	});
}

export default function BottomPanelNode({test}) {
    console.log(`BottomPanelNode`);
    return (<div>
        <h4>{test.song}</h4> <p>{convertArrToReadableString(test.artists)}</p>
    </div>)
}

