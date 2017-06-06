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

function createImgList(){
    var strHtml = '';

    var arr = gImgs.map(function( img ){
       strHtml += createHex(img);
    });
    return strHtml;
}

function createHex(img) {

    var template =
    `
    <div class="hexagon hexagon2">
        <div class="hexagon-in1"> 
            <div class="hexagon-in2" style="background-image: url('${img.url}')"></div>
        </div>
    </div>
    `;
    return template;
}

function render( strHtml, selector ){
    var el       = document.querySelector(selector);
    console.log(el);
    el.innerHTML = strHtml;
}


render( createImgList(), '.thumb-list' );