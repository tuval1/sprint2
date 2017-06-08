"use strict";


var gImgs = [
    {id: 1, url: 'assets/img/1.jpg', keyword: ['baby','telephone']},
    {id: 2, url: 'assets/img/2.jpg', keyword: ['animal','penguin']},
    {id: 3, url: 'assets/img/3.jpg', keyword: ['animal', 'cat']},
    {id: 4, url: 'assets/img/4.jpg', keyword: ['girl']},
    {id: 5, url: 'assets/img/5.jpg', keyword: ['animal', 'dog']},
    {id: 6, url: 'assets/img/6.jpg', keyword: ['animal', 'dog']},
    {id: 7, url: 'assets/img/7.jpg', keyword: ['animal','funny', 'sarcasm']}
];


function init(){  
//set width to the canvas
  gCanvas.width  = canvasWidth;
  gCanvas.height = canvasHeight;

  
// When the image has loaded...
gCanvasImg.onload = function () {
  // Work out where to center it
  var x = gCanvas.width / 2 - gCanvasImg.width / 2;
  var y = gCanvas.height / 2 - gCanvasImg.height / 2;

  // Draw it
  gCtx.drawImage(gCanvasImg, 0, 0, canvasWidth, canvasHeight);
};

  renderImgsList(gImgs, '.thumb-list');
  renderPopularWords();
  sliderTeam();
}

function renderImgsList(imgs) {
    var el = document.querySelector('.thumb-list');
    imgs.forEach(function (img) {
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
    hex.setAttribute('onclick', 'setCanvasImg(this,' + img.id + ')');
    return hex;
}

function searchPopularWords() {

    return gImgs.reduce(function (res, img) {
        (img.keyword).forEach(function (word) {
            (Object.keys(res)).includes(word) ? res[word]++ : res[word] = 1;
        });
        return res;
    }, {});
}

function renderPopularWords() {
    var el = document.querySelector('.popular-words-container');
    var words = searchPopularWords();
    var strHtml ='';

    for (var word in words) {
        var link = document.createElement('a');
        link.href = "#";
        link.innerText = word;
        link.title = word;
        link.style.fontSize = words[word]*10 + 'px';
        link.style.color = getRandomColor();
        link.addEventListener('click', renderImgsByWord);
        el.append(link);
    }
}

function renderImgsByWord(event) {
    event.preventDefault();
    var targetWord = this.innerText.toLowerCase();

    var imgs = gImgs.filter(function (img) {
            return (img.keyword.includes(targetWord));
    });

    clearThumbList();
    renderImgsList(imgs);
}

function clearThumbList() {
    var el = document.querySelector('.thumb-list');
    el.innerText = '';
}

function getSearchUserWord(event) {
    event.preventDefault();
    var elSearch = document.querySelector('#search');
    var targetWord = elSearch.value.toLowerCase();

    var imgs = gImgs.filter(function (img) {
        return (img.keyword.includes(targetWord));
    });

    clearThumbList();
    renderImgsList(imgs);
}

function sliderTeam() {
    var elSlideLeft = document.querySelector('.btn-left');
    var elSlideRight = document.querySelector('.btn-right');
    var elTeamContent1 = document.querySelector('.team-content1');
    var elTeamContent2 = document.querySelector('.team-content2');

    elSlideLeft.addEventListener('click', moveLeft);
    elSlideRight.addEventListener('click', moveRight);

    function moveLeft(event){
        event.preventDefault();
        elTeamContent1.style.display = 'none';
        elTeamContent2.style.display = 'flex';
    }

    function moveRight(event){
        event.preventDefault();
        // elTeamContent1.style.transform.rotate = -1;
        elTeamContent1.style.display = 'flex';
        elTeamContent2.style.display = 'none';
    }
}

function makeDevImg(selector) {
    var elDev = document.querySelector(selector);
    // var elDev2 = document.querySelector('.team-content2 > .team-hex');

    var hex = document.createElement('div');
    hex.classList.add('hexagon');
    var hex2 = document.createElement('div');
    hex2.classList.add('hexTop');
    var hex3 = document.createElement('div');
    hex3.classList.add('hexBottom');
    hex.append(hex2);
    hex.append(hex3);
    hex.style.backgroundImage = url('ass');
    hex.setAttribute('onclick', 'setCanvasImg(this,' + img.id + ')');
    return hex;
}

function toggleDisplayCanvas( el, action ){
  var thumbArea  = document.querySelector('.thumb-wrapper');
  var canvasArea = document.querySelector('.canvas-wrapper');
  if( el === CANVAS ){
      if( action === SHOW ){
        canvasArea.classList.remove('hidden');
        thumbArea.classList.add('hidden');
      } else {
        canvasArea.classList.add('hidden');
        thumbArea.classList.remove('hidden');
      }
    
  }
}