// Global variables

// Canvas Settings
const boundary_pad = 25;
const MAX_POPULATION_SIZE_ALLOWED = 5000;
let debug = false;

// Vehicle Settings
const vehicle_length = 10; //length in pixels
const vehicle_width = 6; //width in pixels

// for initial population generation
const MIN_PERCEPTION_RADIUS = 3;
const MAX_PERCEPTION_RADIUS = 100;
const MAX_SPEED = 10;

// Simulation Settings
let food_create_rate = 0.15; // slider overrides this
const poison_create_rate = 0.01;
let hunger_rate = 0.0025; // slider overrides this
let food_health_gain = 0.1; // slider overrides this
let poison_health_loss = 0.5; // slider overrides this

const CLONE_ATTEMPT_RATE = 0.00125;

// Starting amounts
let vehicle_amount = 50; // slider overrides this
const food_amount = 100;
const poison_amount = 10;


const vehicles = [];
const food = [];
const poison = [];

// Metrics
// --------------------------------------------
// for average age at death
let totalDeathAge = 0;
let deathCount = 0;
let maxGeneration = 0;
let maxAge = 0;
// --------------------------------------------


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
      const x = random(boundary_pad, width-boundary_pad);
      const y = random(boundary_pad, height-boundary_pad);
      food.push(createVector(x,y));
    }

    // Create poison
    for (let i=0;i<poison_amount;i++){
      const x = random(boundary_pad, width-boundary_pad);
      const y = random(boundary_pad, height-boundary_pad);
      poison.push(createVector(x,y));
    }
  }

  function draw(){

    // safety check to prevent population from growing too large
    if (vehicles.length > MAX_POPULATION_SIZE_ALLOWED){
      vehicles.length = MAX_POPULATION_SIZE_ALLOWED;
    }

    // Create food and poison
    if (vehicles.length > 0){
      if (random(1) < food_create_rate){
        food.push(createVector(random(boundary_pad, width-boundary_pad),random(boundary_pad, height-boundary_pad)));
      }
      if (random(1) < poison_create_rate){
        poison.push(createVector(random(boundary_pad, width-boundary_pad),random(boundary_pad, height-boundary_pad)));
      }
    }


    background(0);

    // Visualize food
    for (let i = 0; i<food.length; i++){
      push();
      fill(0,255,0);
      noStroke();
      ellipse(food[i].x,food[i].y,6,6);
      pop();
    }

    // Visualize poison
    for (let i = 0; i<poison.length; i++){
      push();
      fill(255,0,0);
      noStroke();
      ellipse(poison[i].x,poison[i].y,6,6);
      pop();
    }

    // iterate through vehicles in reverse order
    // this is because we are removing vehicles from the array
    // if we iterate forward, the indices will change and we will skip vehicles
    for (let i = vehicles.length-1; i>=0; i--){
      vehicles[i].search_and_eat_behaviours(food, poison);
      vehicles[i].update();
      vehicles[i].apply_boundary_forces();
      
      vehicles[i].show();
      
      vehicles[i].applyHunger();

      if (vehicles[i].dead()){
          recordDeath(vehicles[i]);
          vehicles.splice(i,1);
      } else {
        // Evolutionary step
        // Didn't die, has a chance to mutate
        recordGeneration(vehicles[i]);
        const newVehicle = vehicles[i].clone_and_mutate();
        if (newVehicle != null){
          vehicles.push(newVehicle);
        }
      }
    }

    drawMetrics();
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
  // Reset vehicles, food, and poison
  vehicles.length = 0;
  food.length = 0;
  poison.length = 0;
  // Reset metrics
  totalDeathAge = 0;
  deathCount = 0;
  maxAge = 0;
  maxGeneration = 0;

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

function recordDeath(vehicle){
  totalDeathAge += vehicle.age;
  maxAge = max(maxAge, vehicle.age);
  deathCount += 1;
}

function recordGeneration(vehicle){
  maxGeneration = max(maxGeneration, vehicle.generation);
}

function drawMetrics(){
  const averageAgeAtDeath = deathCount > 0 ? totalDeathAge / deathCount : 0;
  const currentOldestAge = vehicles.reduce((maxAge, vehicle) => max(maxAge, vehicle.age), 0);
  const displayedOldestAge = max(maxAge, currentOldestAge);
  const metrics = [
    `Current Population: ${vehicles.length}`,
    `Avg. Age at Death: ${averageAgeAtDeath.toFixed(1)}`,
    `Max Generation: ${maxGeneration}`,
    `Max Age Reached: ${displayedOldestAge}`,
    `Current Max Age: ${currentOldestAge}`
  ];
  const averageMetrics = [
    'Population Averages',
    `health: ${getAverageVehicleValue('health').toFixed(3)}`,
    `age: ${getAverageVehicleValue('age').toFixed(3)}`,
    `foodDesire: ${getAverageVehicleValue('foodDesire').toFixed(3)}`,
    `poisonDesire: ${getAverageVehicleValue('poisonDesire').toFixed(3)}`,
    `foodPerceptionRadius: ${getAverageVehicleValue('foodPerceptionRadius').toFixed(1)}`,
    `poisonPerceptionRadius: ${getAverageVehicleValue('poisonPerceptionRadius').toFixed(1)}`,
    `maxSpeed: ${getAverageVehicleValue('maxSpeed').toFixed(2)}`,
    `reproductionCost: ${getAverageVehicleValue('reproductionCost').toFixed(3)}`,
    `poisonTolerance: ${getAverageVehicleValue('poisonTolerance').toFixed(3)}`,
  ];
  const oldestVehicle = getDistinguishedOldestVehicle();

  if (oldestVehicle !== null){
    averageMetrics.push(
      '',
      '',
      'Best Vehicle DNA',
      `age: ${oldestVehicle.age}`,
      `foodDesire: ${oldestVehicle.dna[0].toFixed(3)}`,
      `poisonDesire: ${oldestVehicle.dna[1].toFixed(3)}`,
      `foodPerceptionRadius: ${oldestVehicle.dna[2].toFixed(1)}`,
      `poisonPerceptionRadius: ${oldestVehicle.dna[3].toFixed(1)}`,
      `mutationRate: ${oldestVehicle.dna[4].toFixed(3)}`,
      `maxSpeed: ${oldestVehicle.dna[5].toFixed(2)}`,
      `reproductionCost: ${oldestVehicle.dna[6].toFixed(3)}`,
      `poisonTolerance: ${oldestVehicle.dna[7].toFixed(3)}`,
      `startingHealth: ${oldestVehicle.dna[8].toFixed(3)}`
    );
  } else {
    averageMetrics.push(
      '',
      '',
      'Best Vehicle DNA',
      'Waiting for a distinguished vehicle...'
    );
  }

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

  if (debug || true){
    const debugBoxY = 12 + boxHeight + 12;
    const debugBoxHeight = padding * 2 + lineHeight * averageMetrics.length;

    noStroke();
    fill(0, 170);
    rect(12, debugBoxY, boxWidth, debugBoxHeight, 6);

    fill(255);
    for (let i = 0; i < averageMetrics.length; i++){
      text(averageMetrics[i], 24, debugBoxY + padding + i * lineHeight);
    }
  }
  pop();
}

function getAverageVehicleValue(propertyName){
  if (vehicles.length === 0){
    return 0;
  }

  const total = vehicles.reduce((sum, vehicle) => sum + vehicle[propertyName], 0);
  return total / vehicles.length;
}

function getDistinguishedOldestVehicle(){
  if (vehicles.length === 0){
    return null;
  }

  let oldestVehicle = vehicles[0];
  let oldestCount = 1;

  for (let i = 1; i < vehicles.length; i++){
    if (vehicles[i].age > oldestVehicle.age){
      oldestVehicle = vehicles[i];
      oldestCount = 1;
    } else if (vehicles[i].age === oldestVehicle.age){
      oldestCount += 1;
    }
  }

  return oldestCount === 1 ? oldestVehicle : null;
}