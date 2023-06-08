// Constants and configurations

// ...

// Page elements

// ... 


function setup() {
    adjustCanvasSize()
  
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    console.log(l_1,l_2,w_1,w_2,g);

  }


function draw() {

    // Code here

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
  
// Adjusts the size of the canvas when window is resized
function windowResized() {
    setup();
  }

function clearBG() {
  background(0);
}


