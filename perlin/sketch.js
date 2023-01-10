let inc = 0.03; //increments xoff, yoff in perlin noise function
let scl = 10; //size of each grid element?
let cols, rows; //rows and columns of grid

let zoff = 0; //initialized zoff value, increments with z_inc
let z_inc = 0.00007;

let fr;
let particles = [];
let flowfield;
let path_thickness;
let toggle_flow = false;
var boxes = false; //this will control debug mode


function setup() {
  hue_change_val = 1;

  var canvas = createCanvas(windowWidth, windowHeight-180);
  canvas.parent('canvas_container');

  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle(); //Create 1000 particles, place in a list
  }
  background(0);
}

function draw() {
  smooth();

  translate(width/2, height/2);

  // Perlin Noise

  var yoff = 0; //y-offset
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {

      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;

    zoff += z_inc; //time increment
  }

  for (var i = 0; i < particles.length; i++) {
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
  for (var i = 0; i < particles.length; i++) {
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
