"use strict";


var gImgs = [
    { id: 1, url: 'assets/img/1.jpg',keyword:[''] },
    { id: 2, url: 'assets/img/2.jpg',keyword:['animal'] },
    { id: 3, url: 'assets/img/3.jpg',keyword:['animal','cat'] },
    { id: 4, url: 'assets/img/4.jpg',keyword:['animal'] },
    { id: 5, url: 'assets/img/5.jpg',keyword:['animal','dog'] },
    { id: 6, url: 'assets/img/6.jpg',keyword:['animal','dog'] },
    { id: 7, url: 'assets/img/7.jpg',keyword:['animal'] }
    // { id: 8, url: 'assets/img/3.jpg',keyword:[] },
    // { id: 9, url: 'assets/img/4.jpg',keyword:[] },
    // { id: 10, url: 'assets/img/5.jpg',keyword:[] },
    // { id: 11, url: 'assets/img/6.jpg',keyword:[] },
    // { id: 12, url: 'assets/img/7.jpg',keyword:[] }
];

function renderImgList(){
    var el = document.querySelector('.thumb-list');
    gImgs.forEach(function( img  ){
        el.append(createHex(img ))
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


    hex.setAttribute('onclick', 'setCanvasImg(this,'+ img.id + ')');
    return hex;
}

function startGenImg(el, idx) {
    console.log('Start gen', idx);
}

function search() {

    // gImgs.reduce(function (img) {
    //
    // }, {});
    
}



$(document).ready(function () {
    $('.btn-left').click(function(e) {
        e.preventDefault();
        $('.team-content2').slideToggle(1000);
        $('.team-content1').slideToggle(1000);
    });

    $('.btn-right').click(function(e) {
        e.preventDefault();
        $('.team-content2').slideToggle(1000);
        $('.team-content1').slideToggle(1000);
    });
});





// var el = document.querySelector('#hex');
// var div = createHex(gImgs[0]);
// el.append(div);
renderImgList();
