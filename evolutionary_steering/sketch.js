const vehicle_length = 10; //length in pixels
const vehicle_width = 6; //width in pixels

const perception = 50;

const vehicles = [];


function setup() {
    adjustCanvasSize();
    
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    vehicles.push(new Vehicle())

  }

  function draw(){
    background(0);

    const target = createVector(mouseX,mouseY);

    for (let vehicle of vehicles){
        vehicle.seek(target);
        vehicle.update();
        vehicle.edges()
        vehicle.show();
    }
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