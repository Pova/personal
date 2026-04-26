let debug = true;
let rocket;
let counter = 0;

function setup() {
    adjustCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    population = new Population(100);
  }

  function draw(){
    background(0);
    population.update();
    population.show();

    drawMetrics();
    
    if (counter >= ROCKET_LIFESPAN){
      noLoop();
    }

    counter++;
  }

  function drawMetrics(){
    const metrics = [
      `Frame Count: ${counter}`,
    ];

    push();
    textFont('monospace');
    textSize(16);
    textAlign(LEFT, TOP);
    const padding = 12;
    const lineHeight = 22;
    const boxWidth = 285;
    const boxHeight = padding * 2 + lineHeight * metrics.length;
  
    noStroke();
    fill(0, 170);
    rect(12, 12, boxWidth, boxHeight, 6);
  
    fill(255);
    for (let i = 0; i < metrics.length; i++){
      text(metrics[i], 24, 24 + i * lineHeight);
    }
    pop();
  }

// Sets the canvas size based on the window size
function adjustCanvasSize() {
    const totalHeight = document.documentElement.clientHeight;
    const totalWidth = document.documentElement.clientWidth;
  
    const navBarHeight = document.getElementById('navBar').clientHeight;
    const detailBarHeight = document.getElementById('detailBar').clientHeight;
  
    canvasHeight = totalHeight - navBarHeight - detailBarHeight;
    canvasWidth = totalWidth;
  }

function debug_toggle(){
  debug = !debug;
}