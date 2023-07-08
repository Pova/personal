let font;
const points = []; //Need to define this globally.

const vehicles_1 = [];
const vehicles_2 = [];
const vehicles_3 = [];

var xoff = 0;

function preload() {
  font = loadFont('assets/font2.otf');
}


function setup() {
  adjustCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvasContainer');


  bbox_1 = font.textBounds('Welcome', 0, 0, 164);
  bbox_2 = font.textBounds('to my', 0, 0, 164);
  bbox_3 = font.textBounds('Website', 0, 0, 164)

  //Calculating positions
  //Split up vertical distances 30-20-20-30

  vert_space = windowHeight - 100 - bbox_1.h - bbox_2.h - bbox_3.h

  pts_1_x = (windowWidth - bbox_1.w) / 2
  pts_1_y = 100 + vert_space * .3

  points_1 = font.textToPoints('Welcome', pts_1_x, pts_1_y, 164, {
    sampleFactor: .1,
    simplifyThreshold: 0
  });

  pts_2_x = (windowWidth - bbox_2.w) / 2
  pts_2_y = pts_1_y + bbox_1.h + vert_space * .2

  points_2 = font.textToPoints('to my', pts_2_x, pts_2_y, 164, {
    sampleFactor: .1,
    simplifyThreshold: 0
  });

  pts_3_x = (windowWidth - bbox_3.w) / 2
  pts_3_y = windowHeight - vert_space * .3 - bbox_3.h


  points_3 = font.textToPoints('Website', pts_3_x, pts_3_y, 164, {
    sampleFactor: .1,
    simplifyThreshold: 0
  });


  for (var i = 0; i < points_1.length; i++) {
    pt = points_1[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles_1.push(vehicle);
  }

  for (var i = 0; i < points_2.length; i++) {
    pt = points_2[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles_2.push(vehicle);
  }
  for (var i = 0; i < points_3.length; i++) {
    pt = points_3[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles_3.push(vehicle);
  }

}

function draw() {
  background(0);

  for (var i = 0; i < points_1.length; i++) {
    vehicles_1[i].behaviours();
    vehicles_1[i].update();
    vehicles_1[i].show();
  }

  for (var i = 0; i < points_2.length; i++) {
    vehicles_2[i].behaviours();
    vehicles_2[i].update();
    vehicles_2[i].show();
  }

  for (var i = 0; i < points_3.length; i++) {
    vehicles_3[i].behaviours();
    vehicles_3[i].update();
    vehicles_3[i].show();
  }
}

function adjustCanvasSize() {
  const totalHeight = window.innerHeight;
  const totalWidth = window.innerWidth;

  const navBarHeight = document.getElementById('navBar').clientHeight;
  const detailBarHeight = document.getElementById('detailBar').clientHeight;

  canvasHeight = totalHeight - navBarHeight - detailBarHeight;
  canvasWidth = totalWidth;
}


