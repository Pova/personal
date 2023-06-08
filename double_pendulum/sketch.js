// Constants and configurations

let theta_1 = Math.PI;
let theta_2 = Math.PI/8;
const time_increment = 0.1 // Experiment with this
const dampening = 0 ; // Need to experiment with this
const pendulums =  [];
let points = []

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
    beginShape();
    for (let pt of points) {
        noFill();
        stroke(200);
        strokeWeight(1);
        vertex(pt[0], pt[1]);
    }
    endShape();
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


