var gCanvas = document.querySelector('#my-canvas');
var gCtx    = gCanvas.getContext("2d");
var gCanvasImg    = document.querySelector('.start-image');
var gImagesPath = 'assets/img/';
var gBottomTxt = document.querySelector('#bottom-text');
var gBottomTxt = document.querySelector('#text-top');

 var deviceWidth  = window.innerWidth;
 var canvasWidth  = Math.min(600, deviceWidth - 20);
 var canvasHeight = Math.min(480, deviceWidth - 20);

gCanvasStyle = {
  lineWidth: 5,
  fontSize: 30,
  fontFamily: ' arial',
  strokeStyle: 'blue',
  fillStyle: 'yellow',
  textAlign: 'center',
  lineJoin: 'round',
  txtXpos: canvasWidth / 2,
  txtYpos: canvasHeight - (canvasHeight / 4.5),
  txts: [
    { color: 'red', fontSize: 30, align: 'center' },
    { color: 'blue', fontSize: 30, align: 'center' }
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
  // gCtx.strokeStyle = gCanvasStyle.strokeStyle;
  // gCtx.fillStyle   = gCanvasStyle.fillStyle;
  // gCtx.textAlign   = gCanvasStyle.textAlign;
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
  var thumbArea = document.querySelector('.thumb-wrapper');
  thumbArea.classList.add('hidden');

  var canvasWrapper = document.querySelector('.canvas-wrapper');
  canvasWrapper.classList.remove('hidden');
  var imgUrl = getImgUrl( imgId );

  gCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  // imgSrc = gImagesPath + el.getAttribute('data-img');
  imgSrc = imgUrl;
  gCanvasImg.src = imgSrc;
  gCanvasImg.onload = function () {
    gCtx.drawImage(gCanvasImg, 0, 0, canvasWidth, canvasHeight);
  }
}

function download(){
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

function draw() {
  //clear the canvas, need to change the nums to 
  gCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  setStyle();
  gCtx.drawImage(gCanvasImg, 0, 0, canvasWidth, canvasHeight);
  //draw bottom text
  gCtx.strokeStyle = 'red';
  gCtx.fillStyle   = 'black';
  var p = 1;
  gCtx.textAlign   = gCanvasStyle.txts[p].align;
  gCtx.font        = gCanvasStyle.txts[p].fontSize + 'pt' + gCanvasStyle.fontFamily;
  var x = gCanvasStyle.txtXpos;
  var y = gCanvasStyle.txtYpos;
  var textBottom = gBottomTxt.value;
  text = textBottom.toUpperCase();
  wrapText(textBottom, x, y, canvasWidth, 28, true);

  //draw top text
  var p = 0;
  gCtx.strokeStyle = 'orange';
  gCtx.fillStyle   = 'blue';
  gCtx.textAlign   = gCanvasStyle.txts[p].align;
  gCtx.font        = gCanvasStyle.txts[p].fontSize + 'pt' + gCanvasStyle.fontFamily;
  y = 60;
  var textTop = document.querySelector('#text-top').value;
  wrapText(textTop, x, y, canvasWidth, 28, false);
  

}


function alignText( pos ,direction ) {
  if(pos === 'top'){
    var p = 0;
  } else {
    p =1;
  }
  gCanvasStyle.txts[p].align = direction
  draw();
  
}
function increaseFont( pos ){
  if (pos === 'top'){
    var p = 0;
  } else {
    var p = 1;
  }
  gCanvasStyle.txts[p].fontSize += 1;
  
  draw();
}

function decreaseFont(){
  gCanvasStyle.fontSize -= 1;
  draw();
}

function changeTxtColor(){
  var txtColor = document.querySelector('#text-color');
      gCanvasStyle.fillStyle = txtColor.value;  
}

function changeStkColor(){
  var stkColor = document.querySelector('#stroke-color');
      gCanvasStyle.strokeStyle = stkColor.value;   
}

function changeStyle( el ) {
  switch ( el ) {
    // case 'LEFT':
    //   alignText(LEFT);
    //   break;

    // case 'RIGHT':
    //   alignText(RIGHT)
    //   break;

    // case 'CENTER':
    //   alignText(CENTER);      
    //   break;

    // case 'tPlus':
    //   increaseFont();
    //   break;

    // case 'tMinus':
    //   decreaseFont();      
    //   break;

    case 'tColor':
      changeTxtColor();
      break;      

    case 'stkColor':
         changeStkColor();
      break;

    default:
      break;      
  }
    draw();
}

function clearInput(){

}
//  bugs to fix
// changing color does not work correctly
