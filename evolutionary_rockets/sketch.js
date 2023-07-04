let debug = true;


function setup() {
    adjustCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');
  }

  function draw(){
    background(0);
  }

// Sets the canvas size based on the window size
function adjustCanvasSize() {
    const totalHeight = window.innerHeight;
    const totalWidth = window.innerWidth;
  
    const navBarHeight = document.getElementById('navBar').clientHeight;
    const detailBarHeight = document.getElementById('detailBar').clientHeight;
  
    canvasHeight = totalHeight - navBarHeight - detailBarHeight;
    canvasWidth = totalWidth;
  }

function debug_toggle(){
  debug = !debug;
}