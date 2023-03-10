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

function windowResized() {
  setup();
}

function setup() {
  const totalHeight = window.innerHeight;
  const totalWidth = window.innerWidth;

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

  const particle_count = Math.floor((canvasHeight*canvasWidth)/1000);

  for (let i = 0; i < particle_count; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  //background(20,20,20,5); //experimenting with alpha values
  smooth();

  translate(canvasWidth/2, canvasHeight/2);

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

  for (let i = 0; i < particles.length; i++) {
    particles[i].edges();
    particles[i].follow();
    particles[i].update();
    particles[i].show();
    particles[i].aging();
    particles[i].checkdeath();
  }

}


function clearBG() {
  background(0);
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
