var gCanvas     = document.querySelector('#my-canvas');
var gCtx        = gCanvas.getContext("2d");
var gCanvasImg  = document.querySelector('.start-image');
var gImagesPath = 'assets/img/';
var gBottomTxt  = document.querySelector('#bottom-text');
var gTopTxt     = document.querySelector('#text-top');

 var deviceWidth  = window.innerWidth;
 var canvasWidth  = Math.min(600, deviceWidth - 20);
 var canvasHeight = Math.min(480, deviceWidth - 20);

gCanvasStyle = {
  lineWidth: 5,
  fontFamily: ' arial',
  lineJoin: 'round',
  txtXpos: canvasWidth / 2,
  txtYpos: canvasHeight - (canvasHeight / 4.5),
  txts: [
    { color: 'red', fontSize: 30, align: 'center', fillStyle: 'white', 
    strokeStyle: 'black',shadowColor: '',shadowOffsetX: 0, shadowOffsetY: 0 },

    { color: 'blue', fontSize: 30, align: 'center', fillStyle: 'white', 
    strokeStyle: 'black', shadowColor: '',shadowOffsetX: 0, shadowOffsetY: 0 }
  ]
};


function init(){
  
//set width to the canvas
  gCanvas.width  = canvasWidth;
  gCanvas.height = canvasHeight;
}

//change text inside the canvas on live
  gBottomTxt.addEventListener('keydown', draw);
  gBottomTxt.addEventListener('keyup', draw);
  gBottomTxt.addEventListener('change', draw);

  gTopTxt.addEventListener('keydown', draw);
  gTopTxt.addEventListener('keyup', draw);
  gTopTxt.addEventListener('change', draw);

// When the image has loaded...
gCanvasImg.onload = function () {
  // Work out where to center it
  var x = gCanvas.width / 2 - gCanvasImg.width / 2;
  var y = gCanvas.height / 2 - gCanvasImg.height / 2;

  // Draw it
  gCtx.drawImage(gCanvasImg, 0, 0, canvasWidth, canvasHeight);
};

function setStyle() {
  gCtx.lineWidth   = gCanvasStyle.lineWidth;
  gCtx.font        = gCanvasStyle.fontSize + 'pt' + gCanvasStyle.fontFamily;
  gCtx.lineJoin    = gCanvasStyle.lineJoin;

}
//old function//
// function drawText() {
  
//   gBottomTxt.value = text.toUpperCase();
//   x = gCanvas.width / 2;
//   y = gCanvas.height - gCanvas.height / 4.5;
//   gCtx.strokeText(gBottomTxt, x, y);
//   gCtx.fillText(gBottomTxt, x, y);
// }

function setCanvasImg( el, imgId ) {
  //hide thumb area
  var thumbArea = document.querySelector('.thumb-wrapper');
  thumbArea.classList.add('hidden');
//show canvas
  var canvasWrapper = document.querySelector('.canvas-wrapper');
  canvasWrapper.classList.remove('hidden');
  //get selected img url
  var imgUrl = getImgUrl( imgId );
//clear canvas
  gCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  // set selected img to the canvas
  imgSrc = imgUrl;
  gCanvasImg.src = imgSrc;
  gCanvasImg.onload = function () {
  gCtx.drawImage(gCanvasImg, 0, 0, canvasWidth, canvasHeight);
  }
}

function saveImg(){
  var link = gCanvas.toDataURL();
  window.location = link;
}

  //get img by id
  function getImgUrl( id ){
    var e = gImgs.find(function( img ){
    return img.id === id;
    });
  return e.url;

  }  

//text renderer
function wrapText(text, x, y, maxWidth, lineHeight, fromBottom) { 

  var pushMethod = (fromBottom) ? 'unshift' : 'push';

  lineHeight = (fromBottom) ? -lineHeight : lineHeight;

  var lines = [];
  var y = y;
  var line = '';
  var words = text.split(' ');

  for (var n = 0; n < words.length; n++) {
    var testLine = line + ' ' + words[n];
    var metrics = gCtx.measureText(testLine);
    var testWidth = metrics.width;

    if (testWidth > maxWidth) {
      lines[pushMethod](line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines[pushMethod](line);

  for (var k in lines) {
    gCtx.strokeText(lines[k], x, y + lineHeight * k);
    gCtx.fillText(lines[k], x, y + lineHeight * k);
  }


}
function updateStyle( p ){
  gCtx.textAlign   = gCanvasStyle.txts[p].align;
  gCtx.font        = gCanvasStyle.txts[p].fontSize + 'pt' + gCanvasStyle.fontFamily;
  gCtx.strokeStyle = gCanvasStyle.txts[p].strokeStyle;
  gCtx.fillStyle   = gCanvasStyle.txts[p].fillStyle;
  //if shadow is applyed
  if( gCanvasStyle.txts[p].shadowOffsetX && gCanvasStyle.txts[p].shadowOffsetY){
    gCtx.shadowColor = gCanvasStyle.txts[p].shadowColor;
    gCtx.shadowOffsetX = gCanvasStyle.txts[p].shadowOffsetX;
    gCtx.shadowOffsetY = gCanvasStyle.txts[p].shadowOffsetY;
  }
  
}

function draw() {
  //clear the canvas, need to change the nums to 
  gCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  setStyle();
  gCtx.drawImage(gCanvasImg, 0, 0, canvasWidth, canvasHeight);
  //draw bottom text  
  var p = 1;//select the bottom text object
  updateStyle( p );
//set txt position
  var x          = gCanvasStyle.txtXpos;
  var y          = gCanvasStyle.txtYpos;
  var textBottom = gBottomTxt.value;
  text = textBottom.toUpperCase();
  //render the txt on the canvas
  wrapText(textBottom, x, y, canvasWidth, 28, true);

  //draw top text
  var p = 0;//select the top text object
  updateStyle( p );
  //set the top txt position
  y = 60;
  var textTop = gTopTxt.value;
  wrapText(textTop, x, y, canvasWidth, 28, false);
  

}
function getTxtPosition( pos ){
  if( pos === 'top' ){
    var p = 0;//select the top text
  } else {
    p = 1;//select the bottom text
  }
  return p;
}

function alignText( pos ,direction ) {
  var p = getTxtPosition( pos );
  gCanvasStyle.txts[p].align = direction
  draw();
  
}

function changeFontSize( pos, action ){
  var p = getTxtPosition( pos );

  if(action === 'increase') {
    gCanvasStyle.txts[p].fontSize += 1;
  } else {
    gCanvasStyle.txts[p].fontSize -= 1;
  }

draw();
}

function changeTxtColor( pos, type ){
  var p             = getTxtPosition( pos );
  var colorSelector = type + '-color-' + pos;
  var txtColor      = document.querySelector('.' + colorSelector);
  if( type === 'fill')
      gCanvasStyle.txts[p].fillStyle = txtColor.value;  
      else 
        gCanvasStyle.txts[p].strokeStyle = txtColor.value;        
      draw();
}

function addShadow( pos ){
  var p                     = getTxtPosition( pos );
  //selectors
  var shadowColorSelector   = '.' + pos + '-shadow-color';
  var shadowOffsetXselector = '.' + pos + '-shadow-offset-x'
  var shadowOffsetYselector = '.' + pos + '-shadow-offset-y';
  
  var color   = document.querySelector(shadowColorSelector).value;
  var offsetX = document.querySelector(shadowOffsetXselector).value;
  var offsetY = document.querySelector(shadowOffsetYselector).value;

  gCanvasStyle.txts[p].shadowColor = color;
  gCanvasStyle.txts[p].shadowOffsetX = offsetX;
  gCanvasStyle.txts[p].shadowOffsetY = offsetY;
  draw();
}

//clear text
function clearInput( pos ){
  var p = getTxtPosition( pos );
  if( p === 1)
  gBottomTxt.value = '';
    else
      gTopTxt.value = '';
  draw();
}
//  bugs to fix
// changing color does not work correctly
