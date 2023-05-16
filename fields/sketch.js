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

let vec_index = 1;
const vec_dict = {
  1:vf_1,
  2:vf_2,
  3:vf_3,
  4:vf_4,
  5:vf_5,
  6:vf_6,
  7:vf_7,
  8:vf_8,
  9:vf_9,
  10:vf_10
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

  let yoff = -canvasHeight/2; 
  for (let y = 0; y < rows; y++) {
    let xoff = -canvasWidth/2;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      //v = new p5.Vector(yoff,xoff);
      v = vec_dict[vec_index](xoff, yoff);
      flowfield[index] = v;
      xoff += scl;
    }
    yoff += scl;
  }
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

function vecChoice(n){
  resetParticles();
  console.log(n);
  vec_index = n;
}
