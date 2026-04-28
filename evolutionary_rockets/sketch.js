let debug = true;
let rocket;
let counter = 0;
let target; 
let obstacles;
const OBSTACLE_COLOR = [255, 0, 0];
const OBSTACLE_RADIUS = 5;

function setup() {
    adjustCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    target = createVector(width/2, height/4);

    population = new Population(100);
  }

  function draw(){
    if (counter >= ROCKET_LIFESPAN){
      noLoop();
      population.evaluate();
    }

    background(0);

    drawTarget();
    obstacles = setupObstacles(target); // Hide these for now
    drawObstacles(obstacles); // Hide these for now

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

  function drawTarget(){
    push();
    fill(0, 255, 0);
    ellipse(target.x, target.y, 10, 10);
    pop();
  }

  function setupObstacles(target){
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

  function returnObstacleBounds(obstacle){
    return [
        [obstacle[0][0] - OBSTACLE_RADIUS, obstacle[0][1] - OBSTACLE_RADIUS], // (left, up) top left
        [obstacle[1][0] + OBSTACLE_RADIUS, obstacle[1][1] - OBSTACLE_RADIUS], // (right, up) top right
        [obstacle[1][0] + OBSTACLE_RADIUS, obstacle[1][1] + OBSTACLE_RADIUS], // (right, down) bottom right
        [obstacle[0][0] - OBSTACLE_RADIUS, obstacle[0][1] + OBSTACLE_RADIUS]  // (left, down) bottom left
    ]
  }

  function drawObstacles(){
    // draw obstacles
    push();
    for (let i = 0; i < obstacles.length; i++){
      
      fill(OBSTACLE_COLOR);
      noStroke();
      quad(
        obstacles[i][0][0] - OBSTACLE_RADIUS, obstacles[i][0][1] - OBSTACLE_RADIUS,
        obstacles[i][1][0] + OBSTACLE_RADIUS, obstacles[i][1][1] - OBSTACLE_RADIUS,
        obstacles[i][1][0] + OBSTACLE_RADIUS, obstacles[i][1][1] + OBSTACLE_RADIUS,
        obstacles[i][0][0] - OBSTACLE_RADIUS, obstacles[i][0][1] + OBSTACLE_RADIUS
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