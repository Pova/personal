
//SKETCH

let sensitivityZoom = 0.5;

var t = -10; //initial time
var t_inc = 0.05; //initial time interval
var fr; //frame rate element
var curve_name; //curve name variable
var button; //resets animation

let a_1 = .1; //constant in spherical spiral
let points = new Array(); //list of points for each curve
let particle_hue = 0; //initial particle hue

var path = 0;
var path_dict = {0:path_0,1:path_1,2:path_2,3:path_3,4:path_4,5:path_5,6:path_6,7:path_7}; //dictionary of curve paths

var frame_rates = [];

function setup() {
  smooth();
  var canvas = createCanvas(windowWidth, windowHeight-180, WEBGL);
  canvas.parent('canvas_container');
  background(0);

  colorMode(HSB, 255);
  cursor('grab');


  camera(-175, -175, 200, 0, 0, 0, 0, 1, 0);

  curve_name_elt = document.getElementById('curve_name');
  curve_name_elt.style.color = '#F08080';
}

function draw() {

  // if (frameCount%3500 == 0){
  //   console.log('trigger')
  //   frame_rates.push(minute(),frameRate(),points.length);
  // }

  // Enable orbit control
  orbitControl();

  //black background
  background(0);

  //draw axes
  push();
  strokeWeight(.5);
  colorMode(RGB);
  stroke(255,0,0);
  line(0, 0, -1000, 0, 0, 1000); //x-axis
  stroke(0,255,0);
  line(-1000, 0, 0, 1000, 0, 0); //y-axis
  stroke(0,0,255);
  line(0, -1000, 0, 0, 1000, 0); //z-axis
  pop();

  pt = path_dict[path](t)
  points.push(pt);

  scale(scale_val);

  //animate particle
  push();
  colorMode(HSB);
  stroke(particle_hue, 255, 255);
  strokeWeight(5);
  point(pt.x, pt.y, pt.z);
  pop();

  // stroke(255);
  noFill();

  //animate path
  beginShape();

  for (let v of points) {
    strokeWeight(.5);
    stroke(255);
    //stroke(hu, 255, 255);
    vertex(v.x, v.y, v.z);
  }
  endShape();

  if (path==2){
    t += speed*.1;
  } else {
    t += speed;
  }

  // time_slider.value() = t;

  if (particle_hue < 255) {
    particle_hue += 10;
  } else {
    particle_hue = 0;
  }


}

function reset() {
  t = -10;
  points = [];
}

function pathChoice(n){
  reset();
  path = n;

  if (n==2){
    document.getElementById("epi_a_container").style.display = "none";
    document.getElementById("epi_b_container").style.display = "none";
    document.getElementById("epi_c_container").style.display = "none";
    document.getElementById("epi_w_container").style.display = "none";
    document.getElementById("slinky_R_container").style.display = "block";
    document.getElementById("slinky_a_container").style.display = "block";
    document.getElementById("slinky_h_container").style.display = "block";
    document.getElementById("slinky_w_container").style.display = "block";
  } else if (n==7){
    document.getElementById("slinky_R_container").style.display = "none";
    document.getElementById("slinky_a_container").style.display = "none";
    document.getElementById("slinky_h_container").style.display = "none";
    document.getElementById("slinky_w_container").style.display = "none";
    document.getElementById("epi_a_container").style.display = "block";
    document.getElementById("epi_b_container").style.display = "block";
    document.getElementById("epi_c_container").style.display = "block";
    document.getElementById("epi_w_container").style.display = "block";
  } else {
    document.getElementById("slinky_R_container").style.display = "none";
    document.getElementById("slinky_a_container").style.display = "none";
    document.getElementById("slinky_h_container").style.display = "none";
    document.getElementById("slinky_w_container").style.display = "none";
    document.getElementById("epi_a_container").style.display = "none";
    document.getElementById("epi_b_container").style.display = "none";
    document.getElementById("epi_c_container").style.display = "none";
    document.getElementById("epi_w_container").style.display = "none";
  }
}
