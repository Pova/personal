let debug = true;
let rocket;
const ROCKET_POPULATION_SIZE = 100;
const mutationRate = 0.01;
let counter = 0;
let target; 
let obstacles = [];
let draftObstacle = null;
let mode = "simulate" // "placeTarget" / "drawObstacle" / "simulate"
const OBSTACLE_COLOR = [255, 0, 0];
const OBSTACLE_RADIUS = 5;

function setup() {
    adjustCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    target = createVector(width/2, height/4);
    obstacles = createDefaultObstacles(target);

    population = new Population(ROCKET_POPULATION_SIZE);
  }

  function draw(){
    background(0);
    drawTarget();
    drawObstacles(obstacles);
    if (draftObstacle) {
        drawObstacles([draftObstacle]);
      }
    
    if (mode == "simulate"){
  
      population.update();
      population.show();
  
      drawMetrics();
      
      counter++;
  
      if (counter == ROCKET_LIFESPAN){
        population.evaluate();
        population.selection();
  
        counter = 0;
      }
    }
  }

  function drawTarget(){
    push();
    fill(0, 255, 0);
    ellipse(target.x, target.y, 10, 10);
    pop();
  }

  function createDefaultObstacles(target){
    obstacles = [
        // Each obstacle is represented by two points: [ [x1, y1], [x2, y2] ]
        // These are defined relative to the target's position
        [
          [target.x - 80, target.y + 40], [target.x + 80, target.y + 40] // obstacles[0]
        ],
        [
          [target.x - 450, target.y + 150], [target.x - 150, target.y + 130]
        ],
        [
          [target.x + 100, target.y + 220], [target.x + 300, target.y + 260]
        ],
      ]

    return obstacles;
  }

  function returnObstacleBounds(obstacle) {
    const start = createVector(obstacle[0][0], obstacle[0][1]);
    const end = createVector(obstacle[1][0], obstacle[1][1]);
  
    const along = p5.Vector.sub(end, start).setMag(OBSTACLE_RADIUS);
    const normal = createVector(-along.y, along.x).setMag(OBSTACLE_RADIUS);
  
    const top_left = p5.Vector.add(start, normal).sub(along);
    const top_right = p5.Vector.add(end, normal).add(along);
    const bottom_right = p5.Vector.sub(end, normal).add(along);
    const bottom_left = p5.Vector.sub(start, normal).sub(along);
  
    return [
      [top_left.x, top_left.y],
      [top_right.x, top_right.y],
      [bottom_right.x, bottom_right.y],
      [bottom_left.x, bottom_left.y],
    ];
  }

  function drawObstacles(obstaclesToDraw){
    // draw obstacles
    push();
    for (let i = 0; i < obstaclesToDraw.length; i++){
      const obstacle = obstaclesToDraw[i];
      const obstacleBounds = returnObstacleBounds(obstacle);
      
      fill(OBSTACLE_COLOR);
      noStroke();
      quad(
        obstacleBounds[0][0], obstacleBounds[0][1],
        obstacleBounds[1][0], obstacleBounds[1][1],
        obstacleBounds[2][0], obstacleBounds[2][1],
        obstacleBounds[3][0], obstacleBounds[3][1]
      );
      
    }
    pop();
  }

  function drawMetrics(){
    const metrics = [
      `Frame Count: ${counter}`,
      `Generation: ${population.generation}`,
      `Average Fitness: ${population.averageFitness.toFixed(4)}`,
      `Max Fitness: ${population.maxFitness.toFixed(4)}`,
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

function mouseIsOnCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function mousePressed(){

  if (!mouseIsOnCanvas()) {
    return;
  }

  if (mode == "placeTarget"){
    target = createVector(mouseX, mouseY);
    resetSimulation();
  }

  if (mode === "drawObstacle") {
    draftObstacle = [[mouseX, mouseY], [mouseX, mouseY]];
  }

}

function mouseDragged() {
  if (mode === "drawObstacle" && draftObstacle) {
    draftObstacle[1] = [mouseX, mouseY];
  }
}
function mouseReleased() {
  if (mode === "drawObstacle" && draftObstacle) {
    obstacles.push(draftObstacle);
    draftObstacle = null;
    resetSimulation();
  }
}

function resetSimulation() {
  counter = 0;
  population = new Population(ROCKET_POPULATION_SIZE);
}

function clearObstacles() {
  obstacles = [];
  draftObstacle = null;
  resetSimulation();
}