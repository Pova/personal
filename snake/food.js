class Food{
  constructor(pos_x, pos_y) {
    this.x = pos_x;
    this.y = pos_y;
  }


  show(){
    push();
    fill(200, 0, 0);
    rect(this.x, this.y, scl, scl);
    pop();
  }
}
