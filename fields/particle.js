function Particle() {
  this.pos = createVector(random(-windowWidth / 2, windowWidth / 2), random(-windowHeight / 2, windowHeight / 2));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  //this.h = Math.floor(random(0,255));
  this.h = 0;
  this.prevPos = this.pos.copy();
  this.max_age = random(200,500);
  this.age = Math.floor(Math.random(0,this.max_age));
  

  //Updating position of particle

  this.follow = function() {
    var vectors = flowfield;
    var x = floor((this.pos.x + canvasWidth / 2) / scl);
    var y = floor((this.pos.y + canvasHeight / 2) / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(path_effect);
    this.pos.add(this.vel);
    this.acc.mult(0); 
  }

  this.show = function() {
    this.h = this.h + path_hue; //get rid of this?
    if (this.h > 255) {
      this.h = 0;
    }
    //point(this.pos.x, this.pos.y);
    strokeWeight(path_thickness);
    stroke(this.h, path_saturation, path_brightness,50);
    //stroke(this.h, path_saturation, path_brightness, 100);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > canvasWidth / 2) {
      this.age = random(0,this.max_age);
      this.pos = createVector(random(-canvasWidth / 2 - 5, canvasWidth / 2 + 5), random(-canvasHeight / 2 - 5, canvasHeight / 2 + 5));
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
    if (this.pos.x < -canvasWidth / 2) {
      this.age = random(0,this.max_age);
      this.pos = createVector(random(-canvasWidth / 2 - 5, canvasWidth / 2 + 5), random(-canvasHeight / 2 - 5, canvasHeight / 2 + 5));
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
    if (this.pos.y > canvasHeight / 2) {
      this.age = random(0,this.max_age);
      this.pos = createVector(random(-canvasWidth / 2 - 5, canvasWidth / 2 + 5), random(-canvasHeight / 2 - 5, canvasHeight / 2 + 5));
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
    if (this.pos.y < -canvasHeight / 2) {
      this.age = random(0,this.max_age);
      this.pos = createVector(random(-canvasWidth / 2 - 5, canvasWidth / 2 + 5), random(-canvasHeight / 2 - 5, canvasHeight / 2 + 5));
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
  }

  this.aging = function() {
    this.age += 1;
  }

  this.checkdeath = function() {
    if (this.age > this.max_age) {
      ran = Math.random();
      if (ran > 0.1) {
        this.age = 0;
        this.pos = createVector(random(-canvasWidth / 2 - 5, canvasWidth / 2 + 5), random(-canvasHeight / 2 - 5, canvasHeight / 2 + 5));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        //this.h = Math.floor(random(0,255));
        this.updatePrev();
      }
    }
  }
}
