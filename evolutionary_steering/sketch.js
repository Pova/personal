const vehicle_length = 10; //length in pixels
const vehicle_width = 6; //width in pixels

const perception = 50;

const vehicles = [];
let vehicle_amount = 50;

const food_amount = 100;
const poison_amount = 10;

let food_create_rate = 0.15;
const poison_create_rate = 0.01;

// Per-vehicle tunables (read from Vehicle methods)
let hunger_rate = 0.0025;
let food_health_gain = 0.1;
let poison_health_loss = 0.5;

const food = [];
const poison = [];

var debug = false;


function setup() {
    adjustCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');


    // Create vehicles
    for (let i=0;i<vehicle_amount;i++){
      vehicles.push(new Vehicle())
    }
    
    // Create food
    for (let i=0;i<food_amount;i++){
      const x = random(width);
      const y = random(height);
      food.push(createVector(x,y));
    }

    // Create poison
    for (let i=0;i<poison_amount;i++){
      const x = random(width);
      const y = random(height);
      poison.push(createVector(x,y));
    }
  }

  function draw(){
    if (random(1) < food_create_rate){
      food.push(createVector(random(width),random(height)));
    }
    if (random(1) < poison_create_rate){
      poison.push(createVector(random(width),random(height)));
    }

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

    for (var i = vehicles.length-1; i>=0; i--){
        vehicles[i].behaviours(food, poison);

        vehicles[i].update();
        // vehicle.edges();
        vehicles[i].show();

        vehicles[i].applyHunger();

        if (vehicles[i].dead()){
            vehicles.splice(i,1);
        }
    }
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

function reset(){
  vehicles.length = 0;
  food.length = 0;
  poison.length = 0;

  for (let i = 0; i < vehicle_amount; i++){
    vehicles.push(new Vehicle());
  }

  for (let i = 0; i < food_amount; i++){
    food.push(createVector(random(width), random(height)));
  }

  for (let i = 0; i < poison_amount; i++){
    poison.push(createVector(random(width), random(height)));
  }
}

// Resize the live population to match vehicle_amount without a full reset
function syncPopulation(){
  while (vehicles.length < vehicle_amount){
    vehicles.push(new Vehicle());
  }
  while (vehicles.length > vehicle_amount){
    vehicles.pop();
  }
}