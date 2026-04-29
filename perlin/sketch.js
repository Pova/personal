let inc = 0.03; //increments xoff, yoff in perlin noise function
let scl = 10; //size of each grid element
let cols, rows; //rows and columns of grid

let zoff = 0; //initialized zoff value, increments with z_inc
let z_inc = 0.00007;

let fr;
let particles = [];
let flowfield;
let path_thickness;
let toggle_flow = false;
let boxes = false; //this will control debug mode

let animation_started = false;

function windowResized() {
  setup();
}

function setup() {
  const totalHeight = document.documentElement.clientHeight;
  const totalWidth = document.documentElement.clientWidth;

  const navBarHeight = document.getElementById('navBar').clientHeight;
  const detailBarHeight = document.getElementById('detailBar').clientHeight;

  canvasHeight = totalHeight-navBarHeight-detailBarHeight;
  canvasWidth = totalWidth;

  hue_change_val = 1;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvasContainer');

  colorMode(HSB, 255);
  cols = floor(canvasWidth / scl);
  rows = floor(canvasHeight / scl);

  flowfield = new Array(cols * rows);

  // const particle_count = Math.floor((canvasHeight*canvasWidth)/1000);
  const particle_count = 0;

  for (let i = 0; i < particle_count; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  //background(20,20,20,5); //experimenting with alpha values
  smooth();

  translate(canvasWidth/2, canvasHeight/2);

  if (!animation_started) {
    push();
    const promptTextSize = constrain(min(width, height) * 0.08, 24, 128);
    const promptWidth = width * 0.8;
    const promptHeight = promptTextSize * 4;
    textFont('Verdana');
    textAlign(CENTER, CENTER);
    textSize(promptTextSize);
    noStroke();
    fill(100);
    text(
      "Click or drag to start the animation",
      -promptWidth / 2,
      -promptHeight / 2,
      promptWidth,
      promptHeight
    );
    pop();
  }

  // Perlin Noise

  let yoff = 0; //y-offset
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {

      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;

    zoff += z_inc; //time increment
  }

  for (let i = particles.length-1; i >= 0; i--) {
    // particles[i].edges_w_respawn();
    if (particles[i].check_off_canvas()) {
      particles.splice(i, 1);
      continue;
    }
    particles[i].follow();
    particles[i].update();
    particles[i].show();
    particles[i].aging();
    // particles[i].checkdeath();
  }

}

function mouseDragged() {
  // Code to run that uses the event.

  if (!animation_started) {
    animation_started = true;
    background(0);
  }

  let x = mouseX - canvasWidth/2;
  let y = mouseY - canvasHeight/2;
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(x+random(-10, 10), y+random(-10, 10)));
  }
}

function clickIsOnCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function mouseClicked() {
  // Code to run that uses the event.

  if (!animation_started && clickIsOnCanvas()) {
    animation_started = true;
    background(0);
  }

  let x = mouseX - canvasWidth/2;
  let y = mouseY - canvasHeight/2;
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(x+random(-10, 10), y+random(-10, 10)));
  }
}

function clearBG() {
  background(0);
}

function resetAnimation() {
  if (animation_started) {
    animation_started = false;
  }
  clearBG();
  zoff = 0;
  particles = [];
}

function resetParticles() {
  clearBG();
  for (let i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
}

function show_ff() {
  if (toggle_flow){
    toggle_flow = false;
  } else {
    toggle_flow = true;
  }
}
