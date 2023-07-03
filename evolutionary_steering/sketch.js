const vehicle_length = 10; //length in pixels
const vehicle_width = 6; //width in pixels

const perception = 50;

const vehicles = [];

const food_amount = 10;
const poison_amount = 10;
const food = [];
const poison = [];

let debug = true;


function setup() {
    adjustCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    vehicles.push(new Vehicle())

    for (let i=0;i<food_amount;i++){
      const x = random(width);
      const y = random(height);
      food.push(createVector(x,y));
    }

    for (let i=0;i<poison_amount;i++){
      const x = random(width);
      const y = random(height);
      poison.push(createVector(x,y));
    }
  }

  function draw(){
    background(0);

    const target = createVector(mouseX,mouseY);

    for (let i = 0; i<food.length; i++){
      push();
      fill(0,255,0);
      noStroke();
      ellipse(food[i].x,food[i].y,6,6);
      pop();
    }

    for (let i = 0; i<poison.length; i++){
      push();
      fill(255,0,0);
      noStroke();
      ellipse(poison[i].x,poison[i].y,6,6);
      pop();
    }

    for (let vehicle of vehicles){
        vehicle.behaviours(food,poison);

        vehicle.update();
        // vehicle.edges();
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

function debug_toggle(){
  debug = !debug;
}