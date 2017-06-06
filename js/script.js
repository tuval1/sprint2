var gImgs = [
    { id: 1, url: 'images/',keyword:[] },
    { id: 2, url: 'images/',keyword:[] },
    { id: 3, url: 'images/',keyword:[] },
    { id: 4, url: 'images/',keyword:[] }
];

function createImgList(){
    var strHtml = '';

    gImgs.map(function( img ){
        strHtml += `<a href="#">Hi<img src="${img.url}"></a>`;
    });

    console.log(strHtml);
    return strHtml; 
         
}

function render( strHtml, selector ){
    var el       = document.querySelector(selector);
    el.innerHTML = strHtml;
}


render( createImgList(), '.container' );