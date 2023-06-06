// Constants and configurations
const scl = 3; //size of each grid element
const z_inc = 0.00007;

// Page elements
let path_thickness;
let fr;
let toggle_flow = false;
let boxes = false; //this will control debug mode
let show_axes = false; // show axes for debug

// Grid configuration
let cols, rows;
let zoff = 0; //initialized zoff value, increments with z_inc

// Particles and fields
let particles = [];
const flowfield = new Array();
let current_field = "Gradient Field";
let canvasHeight, canvasWidth;
let hue_change_val;

// Store vector formulas and corresponding functions in dictionaries
// Referenced when updating the displayed formula and defining the flow field
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

const vecFormulas = {
  "Gradient Field":" \\mathbf{F}(x,y) = x\\mathbf{i} + y\\mathbf{j}",
  "Hyperbolic Field":"\\mathbf{F}(x,y) = y\\mathbf{i} + x\\mathbf{j}",
  "Circular Field":"\\mathbf{F}(x,y) = -y\\mathbf{i} + x\\mathbf{j}",
  "Uniform Field":"\\mathbf{F}(x,y) = 1 \\mathbf{i} - 1 \\mathbf{j}",
  "Skew Hyperbolic Field":"\\mathbf{F}(x,y) = (y-x)\\mathbf{i} + (y+x)\\mathbf{j}",
  "Sine Cosine Field":"\\mathbf{F}(x,y) = sin(\\alpha x)\\mathbf{i} + cos(\\beta y)\\mathbf{j}",
  "Rotating Sine Field":"\\mathbf{F}(x,y) = sin(\\alpha y)\\mathbf{i} + cos(\\beta x)\\mathbf{j}",
  "Parabolic Spiral Field":"\\mathbf{F}(x,y) = (y^2-x^2)\\mathbf{i} + 2xy\\mathbf{j}",
  "Quadratic Field A":"\\mathbf{F}(x,y) = x^2\\mathbf{i} + y^2\\mathbf{j}",
  "Quadratic Field B":"\\mathbf{F}(x,y) = y^2\\mathbf{i} + x^2\\mathbf{j}",
  "Cubic Field A":"\\mathbf{F}(x,y) = x^3\\mathbf{i} + y^3\\mathbf{j}",
  "Cubic Field B":"\\mathbf{F}(x,y) = y^3\\mathbf{i} + x^3\\mathbf{j}",
  "Improper Nodal Source":"\\mathbf{F}(x,y) = (15x-y)\\mathbf{i} + (16x+7y)\\mathbf{j}",
  "Improper Nodal Sink":"\\mathbf{F}(x,y) = (-2x+y)\\mathbf{i} + (-4x+6y)\\mathbf{j}",
  "Spiral Source":"\\mathbf{F}(x,y) = (-x+4y)\\mathbf{i} + (2x+3y)\\mathbf{j}",
  "Stable Center":"\\mathbf{F}(x,y) = (x-2y)\\mathbf{i} + (x-y)\\mathbf{j}",
  "Spiral Sink":"\\mathbf{F}(x,y) = (-x - 4y) \\mathbf{i} + (2x - 3y) \\mathbf{j}"
};

function setup() {
  adjustCanvasSize()

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

  vecChoice(current_field);
}

function draw() {

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
  if (show_axes){
    push();
    colorMode(RGB)
    stroke(255,255,255,10);
    strokeWeight(1);
    line(-width/2,0,width/2,0);
    line(0,height/2,0,-height/2);
    pop();
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

// Adjusts the size of the canvas when window is resized
function windowResized() {
  setup();
}

// Clears the background
function clearBG() {
  background(0);
}

// Resets all particles
function resetParticles() {
  clearBG();
  for (let i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
}

// Toggles the visibility of the flowfield
function show_ff() {
  toggle_flow = !toggle_flow;
}

function vecChoice(field_name){
  resetParticles();
  current_field = field_name;
  define_flowfield(current_field);
  updateFormula(current_field);

  // Visually distinguish the selected button
  // let buttons = document.getElementById('vectorButtons').getElementsByTagName('button');
  // for (let i = 0; i < buttons.length; i++) {
  //     if (buttons[i].innerHTML === field_name) {
  //         buttons[i].classList.add('btn-selected'); // Add 'btn-selected' class to selected button
  //     } else {
  //         buttons[i].classList.remove('btn-selected'); // Remove 'btn-selected' class from other buttons
  //     }
  // }
}

//
function updateFormula(current_field){
  let formula = vecFormulas[current_field];
  let formulaElement = document.getElementById("vector_field_formula");
  
  let math = MathJax.tex2chtml(formula);
  formulaElement.innerHTML = "";
  formulaElement.appendChild(math);
  MathJax.startup.document.clear();
  MathJax.startup.document.updateDocument();
}

function define_flowfield(current_field){
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