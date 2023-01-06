var w, h;
var cols, rows;
var grid = new Array(cols);

var openSet = []; //cells to check
var closedSet = []; //cells already checked
var start;
var end;

var obsDensity = 0.3; //controls density of the obstacles

var path = [];

var diag_allowed = false; 
var noSolution = false; //set to true if algorithm has no solution

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

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (random(1) < obsDensity) {
        grid[i][j] = new Cell(i, j, true); //Draws solid block
      } else {
        grid[i][j] = new Cell(i, j, false);
      }
    }
  }

  // Other obstacle options - maze


  if (grid[cols - 1][rows - 1].wall == true) {
    grid[cols - 1][rows - 1].wall = false; //fixes blocked target problem
  }

  if (grid[0][0].wall == true) {
    grid[0][0].wall = false; //fixes blocked start problem
  }



  //Can be made more efficient
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }
  // Want to be able to pick these...

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  //path.push(end);
  openSet.push(start);

  //Want to add control over this
  //noLoop();
}


function draw() {

  // if (frameCount % 30 == 0) {
  //   console.log(frameRate());
  // }

  // clear the path every time
  path = [];

  // If there are cells to check...
  if (openSet.length > 0) {
    var current;

    //While there are cells in OpenSet this loop gets activated
    var winner = 0; //index of best so far

    for (var i = 0; i < openSet.length; i++) {
      //iterate over openSet
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    //current is the cell in openSet with the lowest fscore
    current = openSet[winner];

    if (current === end) {

      var text = 'Optimal path length = ' + end.f;

      console.log('A* terminates (success)');
      console.log(text);
      noLoop();
    }




    //remove current from openSet and add to closedSet
    removeFromArray(openSet, current);
    closedSet.push(current);


    var neighbours = current.neighbours;
    //iterate over all neighbours
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
    }//neighbour loop



  }

  //openSet is empty --> algorithm terminates
  else {

    noLoop();
    noSolution = true; //can this ever trigger if there is a solution?


    //draw once more...

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].wall) {
          grid[i][j].show(color(50));
        } else {
          grid[i][j].show(color(108, 117, 125));
        }
      }
    }

    //closed set cells =  light steel blue
    for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(176, 196, 222));
    }

    //start star
    push();
    fill(255, 215, 0);
    translate(w/2,h/2);
    rotate(frameCount / -100.0);
    star(0, 0, 6, 14, 5);
    pop();

    //end star
    push();
    fill(255, 0, 0);
    translate(width-w/2,height-h/2);
    rotate(frameCount / 100.0);
    star(0, 0, 6, 14, 5);
    pop();

    return null;
  }

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

  //closed set cells =  light steel blue
  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(176, 196, 222));
  }

  //open set cells = blue
  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 0, 255));
  }


  //draw the path

  if (current != end) {
    current.reconstruct();
  } else {

    end.reconstruct();
    path.push(end);
  }

  //draw path
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

  //start star
  push();
  fill(255, 215, 0);
  translate(w/2,h/2);
  rotate(frameCount / -100.0);
  star(0, 0, 6, 14, 5);
  pop();

  //end star
  push();
  fill(255, 215, 0);
  translate(width-w/2,height-h/2);
  rotate(frameCount / 100.0);
  star(0, 0, 6, 14, 5);
  pop();

} //closes draw loop

function reset() {
  noSolution = false;
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
      if (random(1) < obsDensity) {
        grid[i][j].wall = true; //Draws solid block
      } else {
        grid[i][j].wall = false;
      }
    }
  }

  if (grid[cols - 1][rows - 1].wall == true) {
    console.log('impossible! changing target...'); //fixes blocked target problem
    grid[cols - 1][rows - 1].wall = false;
  }

  if (grid[0][0].wall == true) {
    grid[0][0].wall = false; //fixes blocked start problem
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  //path.push(end);
  openSet.push(start);

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


  loop();
} //closes reset()

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
