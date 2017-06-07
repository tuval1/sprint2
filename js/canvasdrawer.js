var gCanvas = document.querySelector('#my-canvas');
var gCtx    = gCanvas.getContext("2d");
var gCanvasImg    = document.querySelector('.start-image');
var gImagesPath = 'assets/img/';


var deviceWidth  = window.innerWidth;
var canvasWidth  = Math.min(600, deviceWidth - 20);
var canvasHeight = Math.min(480, deviceWidth - 20);
//set width to the canvas
gCanvas.width  = canvasWidth;
gCanvas.height = canvasHeight;

var gBottomTxt = document.querySelector('#custom-text');

gCanvasStyle = {
  lineWidth: 5,
  fontSize: 30,
  fontFamily: ' arial',
  strokeStyle: 'blue',
  fillStyle: 'yellow',
  textAlign: 'center',
  lineJoin: 'round',
  txtXpos: canvasWidth / 2,
  txtYpos: canvasHeight - (canvasHeight / 4.5)
};


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
  gCtx.strokeStyle = gCanvasStyle.strokeStyle;
  gCtx.fillStyle   = gCanvasStyle.fillStyle;
  gCtx.textAlign   = gCanvasStyle.textAlign;
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
  var imgUrl = getImgUrl( imgId );

  gCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  // imgSrc = gImagesPath + el.getAttribute('data-img');
  imgSrc = imgUrl;
  gCanvasImg.src = imgSrc;
  gCanvasImg.onload = function () {
    gCtx.drawImage(gCanvasImg, 0, 0, canvasWidth, canvasHeight);
  }
}


  //get img by id
  function getImgUrl( id ){
    var e = gImgs.find(function( img ){
    return img.id === id;
    });
  return e.url;

  }
  


function wrapText(text, maxWidth, lineHeight, fromBottom) {
  var x = gCanvasStyle.txtXpos;
  var y = gCanvasStyle.txtYpos;

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
  var text = document.querySelector('#custom-text').value;
  text = text.toUpperCase();

  wrapText(text, canvasWidth, 28, true);

}


const LEFT = 'left';
const CENTER = 'center';
const RIGHT = 'right';

function alignText( direction ) {
  gCanvasStyle.textAlign = direction;
  
}
function increaseFont(){
  gCanvasStyle.fontSize += 1;
}

function decreaseFont(){
  gCanvasStyle.fontSize -= 1;
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
    case 'LEFT':
      alignText(LEFT);
      break;

    case 'RIGHT':
      alignText(RIGHT)
      break;

    case 'CENTER':
      alignText(CENTER);      
      break;

    case 'tPlus':
      increaseFont();
      break;

    case 'tMinus':
      decreaseFont();      
      break;

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
