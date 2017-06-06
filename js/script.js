"use strict";


var gImgs = [
    { id: 1, url: 'assets/img/1.jpg',keyword:[] },
    { id: 2, url: 'assets/img/2.jpg',keyword:[] },
    { id: 3, url: 'assets/img/3.jpg',keyword:[] },
    { id: 4, url: 'assets/img/4.jpg',keyword:[] },
    { id: 2, url: 'assets/img/5.jpg',keyword:[] },
    { id: 3, url: 'assets/img/6.jpg',keyword:[] },
    { id: 4, url: 'assets/img/7.jpg',keyword:[] },
    { id: 3, url: 'assets/img/3.jpg',keyword:[] },
    { id: 4, url: 'assets/img/4.jpg',keyword:[] },
    { id: 2, url: 'assets/img/5.jpg',keyword:[] },
    { id: 3, url: 'assets/img/6.jpg',keyword:[] },
    { id: 4, url: 'assets/img/7.jpg',keyword:[] },
    { id: 3, url: 'assets/img/3.jpg',keyword:[] },
    { id: 4, url: 'assets/img/4.jpg',keyword:[] },
    { id: 2, url: 'assets/img/5.jpg',keyword:[] },
    { id: 3, url: 'assets/img/6.jpg',keyword:[] },
    { id: 4, url: 'assets/img/7.jpg',keyword:[] }
];

function renderImgList(){
    var el = document.querySelector('.thumb-list');
    gImgs.forEach(function( img ){
        el.append(createHex(img))
    });
}

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
    return hex;
}

var el = document.querySelector('#hex');
var div = createHex(gImgs[0]);
el.append(div);
renderImgList();
