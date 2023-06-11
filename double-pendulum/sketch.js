// Constants and configurations

let theta_1 = Math.random()*2*Math.PI;
let theta_2 = Math.random()*2*Math.PI;
const time_increment = 0.1 // Experiment with this
const dampening = 0.0005; // Need to experiment with this value

const pendulums =  []; // Currently just one
let points = []

let isDragging = false;
let initialMousePos;
let initial_theta_1;
let initial_theta_2;

// Page elements

// ... 


function setup() {
    adjustCanvasSize()
  
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    angleMode(RADIANS)
    colorMode(RGB)

    if (pendulums.length == 0){
        double_pendulum = new doublePendulum(
            l_1,
            l_2,
            m_1,
            m_2,
            theta_1,
            theta_2
            )
    
        pendulums.push(double_pendulum);
    }
  }


function draw() {
    background(0);
    translate(width/2, height/3);
    push()
    strokeWeight(5);
    point(0,0);
    pop()

    // Loop through each object in the array
    for (let i = 0; i < pendulums.length; i++) {
        const object = pendulums[i];
        object.update();
        object.draw();
  }

    push();
    colorMode(HSB);
    hue = 0;
    for (let i=0;i<points.length-1;i++){
      noFill();
      strokeWeight(1);
      stroke(hue,255,255,);
      line(points[i][0],points[i][1],points[i+1][0],points[i+1][1]);
      hue = (hue < 255) ? hue + 0.2 : 0;
    }
    smooth();
    pop();

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
  
//Adjusts the size of the canvas when window is resized
function windowResized() {
    setup();
  }

function clearBG() {
  points = [];
}

function resetAnimation(){
  for (let i=0;i<pendulums.length;i++){
    pendulums[i].update_theta_1(Math.random()*2*Math.PI)
    pendulums[i].update_theta_2(Math.random()*2*Math.PI)
  }
  clearBG()
}

function euclideanDistance(point1, point2) {
  var dx = point1.x - point2.x;
  var dy = point1.y - point2.y;

  return Math.sqrt(dx*dx + dy*dy);
}

// function mouseDragged() {
//   const mid_pt = pendulums[0].calc_mid();
//   const end_pt = [mid_pt[0] + pendulums[0].l_2 * sin(pendulums[0].theta_2), mid_pt[1] + pendulums[0].l_2 * cos(pendulums[0].theta_2)];

//   if (pendulums[0].checkMouseDistance(createVector(mid_pt[0], mid_pt[1])) || pendulums[0].checkMouseDistance(createVector(end_pt[0], end_pt[1]))) {
//     isDragging = true;
//     initialMousePos = createVector(mouseX - width / 2, mouseY - height / 3);
//     initialMouseTheta = atan2(initialMousePos.y,initialMousePos.x)
//     console.log(initialMousePos,initialMouseTheta)
//     initial_theta_1 = pendulums[0].theta_1;
//     initial_theta_2 = pendulums[0].theta_2;
//     return false;
//   }
// }

// function mouseReleased() {
//   if (isDragging) {
//     isDragging = false;
//   }
// }

