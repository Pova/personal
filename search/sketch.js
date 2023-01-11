let w, h;
let cols, rows;
let grid = new Array(cols);
let alg_choice = 'A*';

let current;
let openSet = []; //cells to check
let closedSet = []; //cells already checked
let start;
let end;

let obsDensity = 0.25; //controls density of the obstacles

let path = [];

let diag_allowed = false; 
let noSolution = false; //set to true if algorithm has no solution

let counter = 0;
var alg_started = false;
var alg_finished = false;
let draw_allowed = true;
let drawing_maze = false;

function moveActive(groupname, elem){
  if (!alg_started){
    document.querySelector(`.${groupname} .active`).classList.remove('active')
    elem.classList.add("active");
  }
}

function setup() {
  h = 30;
  w = 30;

  rows = Math.floor((windowHeight - 200) / h);
  if (rows%2===0){
    rows -= 1;
  }
  cols = Math.floor((windowWidth - 30) / w);
  if (cols%2===0){
    cols -= 1;
  }
  console.log('rows = ',rows)
  console.log('cols = ', cols)

  canvas = createCanvas(w * cols, h * rows);
  canvas.parent("#canvas_container");

  alg_name_elt = document.getElementById('alg_name');
  alg_name_elt.style.color = '#65C6FF';
  path_length_elt = document.getElementById('path_length');

  //making a 2D array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, false);
    }
  }

  grid = populate_neighbors(grid);

  // Want to be able to pick these...
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
}

function start_alg(){
  if (!alg_started && !alg_finished && !drawing_maze){
    console.log('starting alg: ',alg_choice)
    alg_started = true;
    openSet.push(start);
  }
}

function draw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].wall) {
        grid[i][j].show(color(50));
      } else {
        grid[i][j].show(color(108, 117, 125));
      }
    }
  }

  if (alg_started){
    searchAlgorithm();

    //closed set cells = light blue
    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(176, 196, 222));
    }

    if (!alg_finished){
      //open set cells = dark blue
      for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 0, 255));
      }
    }

    //draw the path
    if (current != end) {
      current.reconstruct();
    } else {
      end.reconstruct();
      path.push(end);
    }

    if (!noSolution) {
      if (current == end){
        for (let i = 0; i < path.length; i++) {
          path[i].show(color(255, 215, 0)); //gold
        }
      } else{
        for (let i = 0; i < path.length; i++) {
          path[i].show(color(255,255,224)); //light yellow
        }
      }
    }
  }

  if (alg_finished){
    //closed set cells = light blue
    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(176, 196, 222));
    }
    if (!noSolution){
      for (let i = 0; i < path.length; i++) {
        path[i].show(color(255, 215, 0)); //gold
      }
      // Needs fixing
      // for (let i=path.length-1;i>0;i--){
      //   drawArrow(path[i], path[i-1]); //arrows
      // }
    }
  }

  //start star
  push();
  stroke(1);
  fill('#65C6FF');
  translate(w/2,h/2);
  rotate(frameCount / -100.0);
  star(0, 0, 5, 10, 5);
  pop();

  //end star
  push();
  stroke(1);
  if (!noSolution){
    fill(255, 215, 0);
  } else {
    fill(255, 0, 0);
  }
  translate(width-w/2,height-h/2);
  rotate(frameCount / 100.0);
  star(0, 0, 5, 10, 5);
  pop();

  if (drawing_maze){
    fill(255);
    stroke(0);
    textSize(128);
    textAlign(CENTER);
    text('Generating Maze', width / 2, height / 2);
  }

  if (alg_started && alg_finished){
    alg_started = false;
  }
  
}

function searchAlgorithm(){
  if (alg_choice === 'A*'){
    astar_alg();
  } else if (alg_choice === 'BFS'){
    bfs_alg();
  } else if (alg_choice === 'DFS') {
    dfs_alg();
  }
}

function astar_alg(){
  path = [];
  if (openSet.length > 0) {
      
      let winner = 0; //index of best so far
  
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }
      current = openSet[winner];

      if (current === end) {
        const path_len = end.f;
        alg_finished = true;
        path_length_elt.innerHTML = 'Path length: ' + (end.f+1) + ' (optimal)';
        path_length_elt.style.color = '#65C6FF';
      }
    
      //remove current from openSet and add to closedSet
      removeFromArray(openSet, current);
      closedSet.push(current);
  
      let neighbours = current.neighbours;
      for (let i = 0; i < neighbours.length; i++) {
        let neighbour = neighbours[i];
  
        //Can be made more efficient
        if (!closedSet.includes(neighbour)) { //(if neighbour is NOT in closedSet)
          //i.e Ignore the neighbour which is already evaluated
          let tempG = current.g + 1;
  
          if (!openSet.includes(neighbour) && neighbour.wall === false) {
            //Discovered new Cell
            openSet.push(neighbour);
          } else if (tempG >= neighbour.g) {
            continue;
            //This is not a better path
          }
  
          //This path is the best until now. Record it!
          neighbour.prev = current;
          neighbour.g = tempG;
          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
        }
      } //neighbour loop
    } else {
      //openSet is empty --> algorithm terminates
      noSolution = true;
      alg_finished = true;
      path_length_elt.innerHTML = 'No path possible!';
      path_length_elt.style.color = '#F08080';
    }
}

function dfs_alg(){
  path = [];

  //open set as stack

  if (openSet.length > 0){

    current = openSet.pop()

    if (current === end) {
      end.reconstruct();
      path.push(end);
      const path_len = path.length;
      alg_finished = true;
      path_length_elt.innerHTML = 'Path length: ' + path_len;
      path_length_elt.style.color = '#65C6FF';
    }

    if (!closedSet.includes(current)){
      closedSet.push(current)
      //
      let neighbours = current.neighbours;
      for (let i = 0; i < neighbours.length; i++){
        if (!closedSet.includes(neighbours[i]) && neighbours[i].wall===false){
          neighbours[i].prev = current;
          openSet.push(neighbours[i]);
        }
      }
    }

  } else {
    // ran out of nodes to check
    alg_finished = true;
    noSolution = true;
    path_length_elt.innerHTML = 'No path possible!';
    path_length_elt.style.color = '#F08080';
  }
}

function bfs_alg(){
  path = [];
  closedSet.push(start);

  //open set as queue

  if (openSet.length > 0){

    current = openSet[0];
    removeFromArray(openSet,current);

    if (current === end) {
      end.reconstruct();
      path.push(end);
      const path_len = path.length;
      alg_finished = true;
      path_length_elt.innerHTML = 'Path length: ' + path_len + ' (optimal)';
      path_length_elt.style.color = '#65C6FF';
    }

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++){
      if (!closedSet.includes(neighbours[i]) && neighbours[i].wall===false){
        closedSet.push(neighbours[i]);
        neighbours[i].prev = current;
        openSet.push(neighbours[i]);
      }
    }
  } else {
    // ran out of nodes to check
    alg_finished = true;
    noSolution = true;
    path_length_elt.innerHTML = 'No path possible!';
    path_length_elt.style.color = '#F08080';
  }
}

function reset() {
  noSolution = false;
  alg_finished = false;
  alg_started = false;
  path = [];
  openSet = [];
  closedSet = [];
  path_length_elt.innerHTML = ''
} 


function randomGrid(grid){
  draw_allowed = false;
  noSolution = false;
  alg_finished = false;
  alg_started = false;
  path = [];
  openSet = [];
  closedSet = [];
  path_length_elt.innerHTML = ''

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].f = 0;
      grid[i][j].g = 0;
      grid[i][j].h = 0;
      grid[i][j].neighbours = [];
      grid[i][j].prev = undefined;
      //grid[i][j].visited = false;
      if (random(1) < obsDensity) {
        grid[i][j].wall = true;
      } else {
        grid[i][j].wall = false;
      }
    }
  }

  grid[cols - 1][rows - 1].wall = false; 
  grid[0][0].wall = false;

  grid = populate_neighbors(grid);
  
  return grid
}

function clearGrid(){
  noSolution = false;
  alg_finished = false;
  alg_started = false;
  path = [];
  openSet = [];
  closedSet = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        grid[i][j].f = 0;
        grid[i][j].g = 0;
        grid[i][j].h = 0;
        grid[i][j].neighbours = [];
        grid[i][j].prev = undefined;
        grid[i][j].wall = false;
        grid[i][j].visited = false;
    }
  }
  draw_allowed = true;
  grid = populate_neighbors(grid);
  const elem = document.querySelector(`.obstSelect #diy_obst`)
  moveActive('obstSelect', elem);
}

function drawYourOwn(){
  draw_allowed = true;
}

async function drawMaze(){
  draw_allowed = false;
  drawing_maze = true;

  for (i=0;i<cols;i+=1){
    for (j=0;j<rows;j+=1){
      grid[i][j].wall = false;
    }
  }
  // fill rows
  for (i=1;i<cols;i+=2){
    for (j=0;j<rows;j+=1){
      grid[i][j].wall = true;
    }
  }
  // fill cols
  for (i=0;i<cols;i+=1){
    for (j=1;j<rows;j+=2){
      grid[i][j].wall = true;
    }
  }
  // reset visited
  for (i=0;i<cols;i+=2){
    for (j=0;j<rows;j+=2){
      grid[i][j].visited = false;
    }
  }

  recursiveBacktrackMaze(start);
  grid = populate_neighbors(grid);
  drawing_maze = false;
}

function recursiveBacktrackMaze(cell){

  cell.visited = true;

  // find maze neighbours

  const neighbours = [];

  //check left
  if (cell.i - 2 >= 0){
    neighbours.push(grid[cell.i-2][cell.j])
  }
  //check above
  if (cell.j - 2 >= 0){
    neighbours.push(grid[cell.i][cell.j-2])
  }
  //check right
  if (cell.i + 2 <= cols-1){
    neighbours.push(grid[cell.i+2][cell.j])
  }
  //check below
  if (cell.j + 2 <= rows-1){
    neighbours.push(grid[cell.i][cell.j+2])
  }
  while (neighbours.length>0){
    const randomIndex = Math.floor(Math.random() * neighbours.length);
    const randomNeighbour = neighbours[randomIndex];
    removeFromArray(neighbours,randomNeighbour);
    if (!randomNeighbour.visited){
    // remove correct wall 

      if (cell.i===randomNeighbour.i){
        if (cell.j-2===randomNeighbour.j){
          //neighbour above
          grid[cell.i][cell.j-1].wall = false;
        } else {
          //neighbour below
          grid[cell.i][cell.j+1].wall = false;
        } 
      } else {
        if (cell.i-2===randomNeighbour.i){
          // neighbour left
          grid[cell.i-1][cell.j].wall = false;
        } else {
          //neighbour right
          grid[cell.i+1][cell.j].wall = false;
        } 
      } 
      recursiveBacktrackMaze(randomNeighbour);
    }
  }
}

function populate_neighbors(grid){
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].neighbours = []
      grid[i][j].addNeighbours(grid);
    }
  }
  return grid
}

function chooseAStar(){
  if (!alg_started){
    alg_choice = 'A*';
    alg_name_elt.innerHTML = "A*";
    path_length_elt.innerHTML = '';
  }
}

function chooseBFS(){
  if (!alg_started){
    alg_choice = 'BFS';
    alg_name_elt.innerHTML = "BFS";
    path_length_elt.innerHTML = '';
  }
}

function chooseDFS(){
  if (!alg_started){
    alg_choice = 'DFS';
    alg_name_elt.innerHTML = "DFS";
    path_length_elt.innerHTML = '';
  }
}

function diagonalsAllowed(){
  noSolution = false;
  alg_finished = false;
  alg_started = false;
  path = [];
  openSet = [];
  closedSet = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(108, 117, 125));
    }
  }

  diag_allowed = true;
  grid = populate_neighbors(grid);
  redraw();
}

function diagonalsNotAllowed(){
  noSolution = false;
  alg_finished = false;
  alg_started = false;
  path = [];
  openSet = [];
  closedSet = [];

  diag_allowed = false;
  redraw();
  grid = populate_neighbors(grid);
}

//Could be made more efficient
function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  //Manhattan distance
  //let d = abs(a.i - b.i) + abs(a.j - b.j);

  //Euclidean distance
  let d = dist(a.i, a.j, b.i, b.j);
  return d;
}

// Function for draw your own obstacle functionality

function mouseDragged() {
  if (!alg_started && draw_allowed){
    if (mouseX<width && mouseX>0 && mouseY<height && mouseY>0){
      col_num = Math.floor((mouseX/width)*cols);
      row_num = Math.floor((mouseY/height)*rows);
      grid[col_num][row_num].wall = true;
      return false;
    }
  }
  // prevent default
}

function mousePressed() {
  if (!alg_started && draw_allowed){
    if (mouseX<width && mouseX>0 && mouseY<height && mouseY>0){
      col_num = Math.floor((mouseX/width)*cols);
      row_num = Math.floor((mouseY/height)*rows);
      grid[col_num][row_num].wall = true;
      return false;
    }
  }
  // prevent default
}

// Custom shapes for canvas using p5.js

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function octogon(x, y, scl) {
  beginShape();
  vertex(x+9, y);
  vertex(x+20, y);
  vertex(x+29, y+9);
  vertex(x+29, y+20);
  vertex(x+20, y+29);
  vertex(x+9, y+29);
  vertex(x, y+20);
  vertex(x, y+9);
  endShape(CLOSE);
}

// Possible addition (arrows on path)
function drawArrow(start_cell, end_cell) {
  dir_x = (end_cell.i-start_cell.i)*30;
  dir_y = (end_cell.j-start_cell.j)*30;
  dir = createVector(dir_x,-dir_y)
  push();
  stroke(0);
  strokeWeight(3);
  fill(0);
  translate(start_cell.i*30+15, start_cell.j*30+15);
  line(0, 0, dir_x, dir_y);
  rotate(dir.heading());
  let arrowSize = 7;
  translate(dir.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

//Possible additions:

// 1) Allow choice of heuristic function (Done but not interesting enough)
// 2) Implement maze options
// 3) Implement other search algorithms - BFS, DFS (Done)
// 4) Implement movable start and end points
