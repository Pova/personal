function Cell(i, j, wall) {
  this.i = i; //column number
  this.j = j; //row number


  this.f = 0; //f(n) = g(n) + h(n)
  this.g = 0; //Actual cost
  this.h = 0; //Heuristic

  this.wall = wall;
  this.neighbours = [];
  this.visited = false;

  this.prev = undefined;

  this.show = function(colour) {
    fill(colour);
    noStroke();
    if (diag_allowed && this.wall==true){
      push();
      fill(color(108, 117, 125));
      rect(this.i * w, this.j * h, w-1, h-1)
      pop();
      octogon(this.i * w, this.j * h, 30);
      
    } else {
      rect(this.i * w, this.j * h, w-1, h-1);
    }
    if (this.visited === true){
      fill(101,198,255);
    }
  }

  this.addNeighbours = function(grid) {
    var i = this.i;
    var j = this.j;

    //Can be made more efficient
    if (i < cols - 1 && grid[i + 1][j].wall === false) {
      this.neighbours.push(grid[i + 1][j]);
    }
    if (i > 0 && grid[i - 1][j].wall === false) {
      this.neighbours.push(grid[i - 1][j]);
    }
    if (j < rows - 1 && grid[i][j + 1].wall === false) {
      this.neighbours.push(grid[i][j + 1]);
    }
    if (j > 0 && grid[i][j - 1].wall === false) {
      this.neighbours.push(grid[i][j - 1]);
    }

    //adding diagonals

    if (diag_allowed) {
      //down + right
      if (i < cols - 1 && j < rows - 1 && grid[i+1][j+1].wall === false) {
        this.neighbours.push(grid[i + 1][j + 1]);
      }

      //down + left
      if (i > 0 && j < rows - 1 && grid[i-1][j+1].wall === false) {
        this.neighbours.push(grid[i - 1][j + 1]);
      }

      //up + right
      if (j > 0 && i < cols - 1 && grid[i+1][j-1].wall === false) {
        this.neighbours.push(grid[i + 1][j - 1]);
      }

      //up + left
      if (j > 0 && i > 0 && grid[i-1][j-1].wall === false) {
        this.neighbours.push(grid[i - 1][j - 1]);
      }
    }
  }


  this.reconstruct = function() {
    if (this.prev != undefined) {
      path.push(this.prev);
      this.prev.reconstruct();
    }
  }
}
