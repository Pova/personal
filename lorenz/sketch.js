var canvas
var rSlider, gSlider, bSlider;
var r, theta, phi
var button

let counter = 0

let x = 0.01;
let y = 0;
let z = 0;

let points = new Array();

let a = 10; //sigma
let b = 28; //rho
let c = 8.0 / 3.0; //beta

let pause = false;

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight-180, WEBGL);
  	canvas.parent('canvas_container');

	background(0);
	cursor('grab');

	camera(175, -175, 200, 0, 0, 0, 0, 1, 0);

	// button = createButton("reset sketch");
	// button.id('reset_button')

	colorMode(HSB);

	//slider_5 = createSlider(-TWO_PI, TWO_PI, 0, 0.1);
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

	console.log(frameRate());
	if (frameRate() < 5){
		resetSketch();
	}

	//button.mousePressed(resetSketch);
	// rect(1,1,399,399);
	// noFill();
	// stroke(0);
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

	//theta = slider_5.value();

	scale(3);
	stroke(255);


	let hu = 0;
	let br = 255

	push();
	beginShape();
	for (let v of points) {
		noFill();
		stroke(255);
	strokeWeight(1);
		vertex(v.x, v.y, v.z);
	}
	endShape();
	pop();
}
