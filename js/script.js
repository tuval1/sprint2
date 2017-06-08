"use strict";


var gImgs = [
    {id: 1, url: 'assets/img/1.jpg', keyword: ['sad','dog']},
    {id: 2, url: 'assets/img/2.jpg', keyword: ['animal','sad']},
    {id: 3, url: 'assets/img/3.jpg', keyword: ['animal', 'cat']},
    {id: 4, url: 'assets/img/4.jpg', keyword: ['girl']},
    {id: 5, url: 'assets/img/5.jpg', keyword: ['animal', 'dog']},
    {id: 6, url: 'assets/img/6.jpg', keyword: ['animal', 'dog']},
    {id: 7, url: 'assets/img/7.jpg', keyword: ['animal','funny', 'sarcasm']}
];

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

function startGenImg(el, idx) {
    console.log('Start gen', idx);
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
    var targetWord = this.innerText;

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


renderImgsList(gImgs, '.thumb-list');
renderPopularWords('.thumb-list');
