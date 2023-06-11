let mandelbrot; // The shader

// Define the region we want to use
// to visualize the mandelbrot set

let centreX, centreY;
let sideLength;
let sideLengthRatio;

let zoom_scale = 1;

function preload(){
    mandelbrot = loadShader('fractal.vert','fractal.frag');
}

function setup(){
    adjustCanvasSize();
  
    const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
    canvas.parent('canvasContainer');
    pixelDensity(1);
    
    // Define default region

    centreX = -0.7;
    centreY = 0;

    sideLength = 2.4;
    sideLengthRatio = width/height;

    shader(mandelbrot);
}

function draw(){
    // Calculate new region on mousedrag

    drag();

    // update the region inside the shader

    mandelbrot.setUniform("minx",centreX - (sideLength/2)*sideLengthRatio);
    mandelbrot.setUniform("maxx",centreX + (sideLength/2)*sideLengthRatio);
    mandelbrot.setUniform("miny",centreY - (sideLength/2));
    mandelbrot.setUniform("maxy",centreY + (sideLength/2));

    // Give the shader a surface to draw on

    rect(-width/2, -height/2, width, height);
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

  function drag(){
    if (mouseIsPressed){
        // Scale the difference in prev mouse and current mouse by the sideLength

        let dx = (pmouseX - mouseX)/width * sideLength * sideLengthRatio;
        let dy = (pmouseY - mouseY)/height * sideLength;

        // Update the centre pos with the mouse movement

        centreX += dx;
        centreY += dy;
    }
  }

// Need to work on this for scrolling

//   function mouseWheel(event){
//     if (event.delta<0){
//         // Zoom in
//         sideLength *= 10/11;
//     } else {
//         // Zoom out
//         sideLength *= 11/10;
//     }

//     // Make sure no crazy values

//     sideLength = constrain(sideLength,0,3);
//   }

  function zoomIn(){
    zoom_scale++;
    if (zoom_scale>27){
      warning_p = document.getElementById('warning_text');
      warning_p.innerHTML = 'Reaching float precision limit...'
    }
    console.log(zoom_scale);
    sideLength *= 2/3;
    sideLength = constrain(sideLength,0,3);
  }

  function zoomOut(){
    zoom_scale--;
    if (zoom_scale<27){
      warning_p = document.getElementById('warning_text');
      warning_p.innerHTML = ''
    }
    console.log(zoom_scale);
    sideLength *= 3/2;
    sideLength = constrain(sideLength,0,3);
  }

  function reset(){
    sideLength = 2.4;
    warning_p = document.getElementById('warning_text');
    warning_p.innerHTML = ''
  }