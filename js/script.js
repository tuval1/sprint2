"use strict";


var gImgs = [
    { id: 1, url: 'assets/img/1.jpg',keyword:[] },
    { id: 2, url: 'assets/img/1.jpg',keyword:[] },
    { id: 3, url: 'assets/img/1.jpg',keyword:[] },
    { id: 4, url: 'assets/img/1.jpg',keyword:[] },
    { id: 2, url: 'assets/img/1.jpg',keyword:[] },
    { id: 3, url: 'assets/img/1.jpg',keyword:[] },
    { id: 4, url: 'assets/img/1.jpg',keyword:[] }
];

function renderImgList(){
    var el = document.querySelector('.thumb-list');
    gImgs.forEach(function( img ){
        el.append(createHex(img))
    });
}

// function renderItem(selector) {
//     var el = document.querySelector(selector);
//     el.append(createHex(gImgs[0]));
// }

function createHex(img) {

    var hex = document.createElement('div');
    hex.classList.add('hexagon');
    var hex2 = document.createElement('div');
    hex2.classList.add('hexTop');
    var hex3 = document.createElement('div');
    hex3.classList.add('hexBottom');
    hex.append(hex2);
    hex.append(hex3);
    hex.style.backgroundImage = `url(${img.url})`;
    console.dir(hex.style);
    return hex;
}

function render( strHtml, selector ){
    // var el       = document.querySelector(selector);
    // el.innerHTML = strHtml;
    var elems = document.querySelectorAll('.hexagon');
    console.log(elems);
    elems[0].style.backgroundImage = gImgs[0].url;
}

renderImgList();
var el = document.querySelector('.team-hex');
el.append(createHex(gImgs[0]));