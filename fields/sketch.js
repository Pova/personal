let scl = 3; //size of each grid element
let cols, rows; //rows and columns of grid

let zoff = 0; //initialized zoff value, increments with z_inc
let z_inc = 0.00007;

let fr;
let particles = [];
const flowfield = new Array();
let path_thickness;
let toggle_flow = false;
let boxes = false; //this will control debug mode

let current_field = "Gradient Field";
const vec_dict = {
  "Gradient Field":vf_gradient,
  "Hyperbolic Field":vf_hyperbolic,
  "Circular Field":vf_circular,
  "Uniform Field":vf_uniform,
  "Skew Hyperbolic Field":vf_skew_hyperbolic,
  "Sine Cosine Field":vf_sine_cosine,
  "Rotating Sine Field":vf_rotating_sine,
  "Parabolic Spiral Field":vf_parabolic_spiral,
  "Quadratic Field A":vf_quadratic_A,
  "Quadratic Field B":vf_quadratic_B,
  "Cubic Field A":vf_cubic_A,
  "Cubic Field B":vf_cubic_B,
  "Improper Nodal Source":vf_improper_nodal_source,
  "Improper Nodal Sink":vf_improper_nodal_sink,
  "Spiral Source":vf_spiral_source,
  "Stable Center":vf_stable_center,
  "Spiral Sink":vf_spiral_sink
};

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

  const particle_count = Math.floor((canvasHeight*canvasWidth)/4000);

  for (let i = 0; i < particle_count; i++) {
    particles[i] = new Particle();
  }
  background(0);

  // colour vector field name
  field_name_elt = document.getElementById('field_name');
  field_name_elt.style.color = '#65C6FF';

  define_flowfield()
}

function draw() {

  console.log(mouseX,mouseY);

  background(0,0,0,10);
  smooth();

  translate(canvasWidth/2, canvasHeight/2);

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

function vecChoice(field_name){
  resetParticles();
  current_field = field_name;
  define_flowfield()

  // Visually distinguish the selected button
  let buttons = document.getElementById('vectorButtons').getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].innerHTML === field_name) {
          buttons[i].classList.add('btn-selected'); // Add 'btn-selected' class to selected button
      } else {
          buttons[i].classList.remove('btn-selected'); // Remove 'btn-selected' class from other buttons
      }
  }

}

function define_flowfield(){
  let yoff = -canvasHeight/2; 
  for (let y = 0; y < rows; y++) {
    let xoff = -canvasWidth/2;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      v = vec_dict[current_field](xoff, yoff);
      flowfield[index] = v;
      xoff += scl;
    }
    yoff += scl;
  }
}