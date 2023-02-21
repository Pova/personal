let canvas
let rSlider, gSlider, bSlider;
let r, theta, phi
let button

let counter = 0

let x = 0.01;
let y = 0;
let z = 0;

let points = new Array();

let a = 10; //sigma
let b = 28; //rho
let c = 8.0 / 3.0; //beta
let hu = 0;

let pause = false;

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

	let canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  	canvas.parent('canvasContainer');

	background(0);
	cursor('grab');
	camera(175, -175, 200, 0, 0, 0, 0, 1, 0);

	critical_pt_1_x = Math.sqrt(c*(b-1));;
	critical_pt_1_y = Math.sqrt(c*(b-1));;
	critical_pt_1_z = b-1;
	critical_pt_1 = new p5.Vector(critical_pt_1_x,critical_pt_1_y,critical_pt_1_z);
	critical_pt_2_x = -Math.sqrt(c*(b-1));;
	critical_pt_2_y = -Math.sqrt(c*(b-1));;
	critical_pt_2_z = b-1;
	critical_pt_2 = new p5.Vector(critical_pt_2_x,critical_pt_2_y,critical_pt_2_z);
}

function resetSketch(){
	points = new Array();

	x = 0.01;
	y = 0;
	z = 0;
}

function pauseSketch(){
	if (pause == false){
		pause = true;
	}
}

function draw() {
	// Enable orbit control
	orbitControl();

	//console.log(frameRate());
	if (frameRate() < 5){
		resetSketch();
	}

	background(0);

	//draw axes
	push();
	strokeWeight(.5);
	colorMode(RGB);
	stroke(255,0,0); //red
	line(0, 0, -1000, 0, 0, 1000); //x-axis
	stroke(0,255,0); //green
	line(-1000, 0, 0, 1000, 0, 0); //y-axis
	stroke(0,0,255); //blue
	line(0, -1000, 0, 0, 1000, 0); //z-axis
	pop();

	let dt = 0.005;
	let dx = (a * (y - x)) * dt;
	let dy = (x * (b - z) - y) * dt;
	let dz = (x * y - c * z) * dt;
	x = x + dx;
	y = y + dy;
	z = z + dz;

	points.push(new p5.Vector(x, y, z));

	scale(3);
	stroke(255);

	push();
	beginShape();
	for (let v of points) {
		noFill();
		stroke(255);
		strokeWeight(.5);
		vertex(v.x, v.y, v.z);
	}
	endShape();
	pop();

	push();
	strokeWeight(10);
	stroke(150);
	point(critical_pt_1);
	point(critical_pt_2);
	pop();
}
