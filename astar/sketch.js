var w, h;
var cols, rows;
var grid = new Array(cols);

var current;
var openSet = []; //cells to check
var closedSet = []; //cells already checked
var start;
var end;

var obsDensity = 0.3; //controls density of the obstacles

var path = [];

var diag_allowed = false; 
var noSolution = false; //set to true if algorithm has no solution

var counter = 0;
var alg_started = false;
var alg_finished = false;

function setup() {
  h = 30;
  w = 30;

  rows = Math.floor((windowHeight - 200) / h);
  cols = Math.floor((windowWidth - 30) / w);

  canvas = createCanvas(w * cols, h * rows);
  canvas.parent("#canvas_container");


  //making a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }


  //Randomly populates obstacles

  // for (var i = 0; i < cols; i++) {
  //   for (var j = 0; j < rows; j++) {
  //     if (random(1) < obsDensity) {
  //       grid[i][j] = new Cell(i, j, true); //Draws solid block
  //     } else {
  //       grid[i][j] = new Cell(i, j, false);
  //     }
  //   }
  // }

  // grid[cols - 1][rows - 1].wall = false; 
  // grid[0][0].wall = false;
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, false);
    }
  }

  populate_neighbors();

  // Want to be able to pick these...
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  noLoop();
}

function start_alg(){
  if (!alg_finished){
    alg_started = true;
    openSet.push(start);
    loop();
  }
}

function draw() {
  console.log('draw loop')
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
    astar();

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

function astar(){
  //console.log('A* called')
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
        const text = 'Optimal path length = ' + end.f;
        console.log('A* terminates (success)');
        console.log(text);
        alg_finished = true;
        noLoop();
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
      noLoop();
    }
}

function reset() {
  noSolution = false;
  alg_finished = false;
  alg_started = false;
  console.log('reset');

  path = [];
  openSet = [];
  closedSet = [];

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
        grid[i][j].f = 0;
        grid[i][j].g = 0;
        grid[i][j].h = 0;
        grid[i][j].neighbours = [];
        this.prev = undefined;
        grid[i][j].wall = false;
    }
  }

  populate_neighbors();

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  //openSet.push(start);

  //draw grid
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].wall) {
        grid[i][j].show(color(50)); //black
      } else {
        grid[i][j].show(color(108, 117, 125)); //grey
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
  fill(255, 215, 0);
  translate(width-w/2,height-h/2);
  rotate(frameCount / 100.0);
  star(0, 0, 5, 10, 5);
  pop();

  noLoop();
} //closes reset()


function random_grid(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (random(1) < obsDensity) {
        grid[i][j] = new Cell(i, j, true); //Draws solid block
      } else {
        grid[i][j] = new Cell(i, j, false);
      }
    }
  }

  grid[cols - 1][rows - 1].wall = false; 
  grid[0][0].wall = false;

  populate_neighbors();
  redraw();
}

function populate_neighbors(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }
}

//Controls if diagonals are allowed when populating neighbours
function myCheckedEvent() {
  if (checkbox.checked()) {
    diag_allowed = true;
    console.log('checkbox checked');
  } else {
    diag_allowed = false;
    console.log('checkbox unchecked');
  }
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

//Possible additions:

// 1) Allow choice of heuristic function
// 2) Implement maze options and/or density choices
// 3) Implement other search algorithms - BFS, DFS, Dikstra
// 4) Implement movable start and end points
