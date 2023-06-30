const vehicle_length = 10; //length in pixels
const vehicle_width = 6; //width in pixels

const perception = 50;

const vehicles = [];

const food_amount = 10;
const poison_amount = 10;
const food = [];
const poison = [];


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

    for (let vehicle of vehicles){
        //vehicle.seek(target);
        vehicle.eat(food);
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