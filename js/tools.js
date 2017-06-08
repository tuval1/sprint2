"use strict";

function shuffleArr(arr) {
    return arr.sort(function() { return 0.5 - Math.random() });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
