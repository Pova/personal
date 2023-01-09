var w, h;
var cols, rows;
var grid = new Array(cols);
let alg_choice = 'A*';

var current;
var openSet = []; //cells to check
var closedSet = []; //cells already checked
var start;
var end;

var obsDensity = 0.25; //controls density of the obstacles

var path = [];

var diag_allowed = false; 
var noSolution = false; //set to true if algorithm has no solution

var counter = 0;
var alg_started = false;
var alg_finished = false;

let draw_allowed = true;

function moveActive(groupname, elem){
  document.querySelector(`.${groupname} .active`).classList.remove('active')
  elem.classList.add("active");
}

function setup() {
  h = 30;
  w = 30;

  rows = Math.floor((windowHeight - 200) / h);
  cols = Math.floor((windowWidth - 30) / w);

  canvas = createCanvas(w * cols, h * rows);
  canvas.parent("#canvas_container");

  alg_name_elt = document.getElementById('alg_name');
  alg_name_elt.style.color = '#65C6FF';
  path_length_elt = document.getElementById('path_length');
  //path_length_elt.style.color = '#F08080';


  //making a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, false);
    }
  }

  grid = populate_neighbors(grid);

  // Want to be able to pick these...
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  //noLoop();
}

function start_alg(){
  if (!alg_started && !alg_finished){
    alg_started = true;
    openSet.push(start);
    loop();
  }
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
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
    for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(176, 196, 222));
    }

    if (!alg_finished){
      //open set cells = dark blue
      for (var i = 0; i < openSet.length; i++) {
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
        for (var i = 0; i < path.length; i++) {
          path[i].show(color(255, 215, 0)); //gold
        }
      } else{
        for (var i = 0; i < path.length; i++) {
          path[i].show(color(255,255,224)); //light yellow
        }
      }
    }
  }

  if (alg_finished){
    //closed set cells = light blue
    for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(176, 196, 222));
    }
    if (!noSolution){
      for (var i = 0; i < path.length; i++) {
        path[i].show(color(255, 215, 0)); //gold
      }
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

  if (alg_started && alg_finished){
    alg_started = false;
  }
}

function searchAlgorithm(){
  if (alg_choice = 'A*'){
    astar_alg();
  } else if (alg_choice = 'BFS'){
    bsf_alg();
  } else if (alg_choice = 'DFS') {
    dfs_alg();
  }
}

function astar_alg(){
  path = [];
  if (openSet.length > 0) {
      
      var winner = 0; //index of best so far
  
      for (var i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }
      current = openSet[winner];

      if (current === end) {
        const path_len = end.f;
        //const text = 'Optimal path length = ' + end.f;
        //console.log('A* terminates (success)');
        //console.log(text);
        alg_finished = true;
        path_length_elt.innerHTML = 'Path length: ' + end.f + ' (optimal)'
        path_length_elt.style.color = '#65C6FF';
      }
    
      //remove current from openSet and add to closedSet
      removeFromArray(openSet, current);
      closedSet.push(current);
  
      var neighbours = current.neighbours;
      for (var i = 0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];
  
        //Can be made more efficient
        if (!closedSet.includes(neighbour)) { //(if neighbour is NOT in closedSet)
          //i.e Ignore the neighbour which is already evaluated
          var tempG = current.g + 1;
  
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
      path_length_elt.innerHTML = 'No path possible!'
      path_length_elt.style.color = '#F08080';
    }
}

function DFS(){
  // CODE
}

function BFS(){
  // CODE
}

function reset(grid) {
  noSolution = false;
  alg_finished = false;
  alg_started = false;
  path = [];
  openSet = [];
  closedSet = [];
  path_length_elt.innerHTML = ''

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].wall) {
        grid[i][j].show(color(50));
      } else {
        grid[i][j].show(color(108, 117, 125));
      }
    }
  }

  if (draw_allowed){
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
          grid[i][j].f = 0;
          grid[i][j].g = 0;
          grid[i][j].h = 0;
          grid[i][j].neighbours = [];
          grid[i][j].prev = undefined;
          grid[i][j].wall = false;
      }
    }
  } else if (random_grid){
    randomGrid(grid)
  }


  grid = populate_neighbors(grid);

  //start = grid[0][0];
  //end = grid[cols - 1][rows - 1];

  return grid
} //closes reset()


function randomGrid(grid){
  draw_allowed = false;
  noSolution = false;
  alg_finished = false;
  alg_started = false;
  path = [];
  openSet = [];
  closedSet = [];
  random_grid = true;
  path_length_elt.innerHTML = ''

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].f = 0;
      grid[i][j].g = 0;
      grid[i][j].h = 0;
      grid[i][j].neighbours = [];
      grid[i][j].prev = undefined;
      if (random(1) < obsDensity) {
        grid[i][j].wall = true;
        //grid[i][j] = new Cell(i, j, true); //Draws solid block
      } else {
        grid[i][j].wall = false;
        //grid[i][j] = new Cell(i, j, false);
      }
    }
  }

  grid[cols - 1][rows - 1].wall = false; 
  grid[0][0].wall = false;

  grid = populate_neighbors(grid);

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  
  return grid
}

function drawYourOwn(){
  draw_allowed = true;
  random_grid = false;
}

function drawMaze(){
  draw_allowed = false;
  random_grid = false;
}

function populate_neighbors(grid){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].neighbours = []
      grid[i][j].addNeighbours(grid);
    }
  }
  return grid
}

function chooseAStar(){
  alg_choice = 'A*';
  alg_name_elt.innerHTML = "A*";
  path_length_elt.innerHTML = '';
}

function chooseBFS(){
  alg_choice = 'bfs';
  alg_name_elt.innerHTML = "BFS";
  path_length_elt.innerHTML = '';
}

function chooseDFS(){
  alg_choice = 'dfs';
  alg_name_elt.innerHTML = "DFS";
  path_length_elt.innerHTML = '';
}

function diagonalsAllowed(){
  noSolution = false;
  alg_finished = false;
  alg_started = false;
  path = [];
  openSet = [];
  closedSet = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
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
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  //Manhattan distance
  //var d = abs(a.i - b.i) + abs(a.j - b.j);

  //Euclidean distance
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

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

function mouseDragged() {
  if (!alg_started && draw_allowed){
    if (mouseX<width && mouseX>0 && mouseY<height && mouseY>0){
      col_num = Math.floor((mouseX/width)*cols);
      row_num = Math.floor((mouseY/height)*rows);
      grid[col_num][row_num].wall = true;
    }
  }
  // prevent default
  return false;
}

function mousePressed() {
  if (!alg_started && draw_allowed){
    if (mouseX<width && mouseX>0 && mouseY<height && mouseY>0){
      col_num = Math.floor((mouseX/width)*cols);
      row_num = Math.floor((mouseY/height)*rows);
      grid[col_num][row_num].wall = true;
    }
  }
  // prevent default
  return false;
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

//Possible additions:

// 1) Allow choice of heuristic function
// 2) Implement maze options and/or density choices
// 3) Implement other search algorithms - BFS, DFS, Dikstra
// 4) Implement movable start and end points
