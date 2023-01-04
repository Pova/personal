function Particle() {
  // this.pos = createVector(random(-5, 5), random(-5, 5));
  this.pos = createVector(random(-windowWidth / 2, windowWidth / 2), random(-windowHeight / 2, windowHeight / 2));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  //this.maxspeed = 2;
  this.h = 0;
  this.prevPos = this.pos.copy();
  this.age = 0;
  this.max_age = 5000;

  //Updating position of particle

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(path_effect);
    this.pos.add(this.vel);
    this.acc.mult(0); //Why is this here?
  }


  this.follow = function() {
    var vectors = flowfield;
    var x = floor((this.pos.x + width / 2) / scl);
    var y = floor((this.pos.y + height / 2) / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);

    // if (sel.value() == 'Swirly') {
    //   var x = this.pos.x;
    //   var y = this.pos.y;
    //   var force = createVector(x+2*y, 1 - x^2);
    //   this.applyForce(force);
    // } else if (sel.value() == 'Swirly #2') {
    //   var x = this.pos.x;
    //   var y = this.pos.y;
    //   var force = createVector(100-y^2, x - y);
    //   this.applyForce(force);
    // } else if (sel.value() == 'Vector Field 4') {
    //   var x = this.pos.x;
    //   var y = this.pos.y;
    //   var force = createVector(-.1*x, -.1*y);
    //   this.applyForce(force);
    // } else if (sel.value() == 'Vector Field 5') {
    //   var x = this.pos.x;
    //   var y = this.pos.y;
    //   var force = createVector(-y, x);
    //   this.applyForce(force);
    // } else if (sel.value() == 'Orbitals') {
    //   var x = this.pos.x;
    //   var y = this.pos.y;
    //   var force = createVector(y, -x);
    //   this.applyForce(force);
    // } else if (sel.value() == 'Vector Field 7') {
    //   var x = this.pos.x;
    //   var y = this.pos.y;
    //   var force = createVector(x, -y);
    //   this.applyForce(force);
    // } else if (sel.value() == 'Barrier') {
    //   var x = this.pos.x;
    //   var y = this.pos.y;
    //   var force = createVector(-x, y);
    //   this.applyForce(force);
    // } else if (sel.value() == 'Vector Field 9') {
    //     var x = this.pos.x;
    //     var y = this.pos.y;
    //     var force = createVector(0, -x);
    //     this.applyForce(force);
    // } else if (sel.value() == 'Hyperspeed') {
    //     var x = this.pos.x;
    //     var y = this.pos.y;
    //     var force = createVector(x, y);
    //     this.applyForce(force);
    // }
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    // strokeWeight(5)
    // point(this.pos.x,this.pos.y);
    // stroke(this.h, 255, 255, 255);
    // var hue_change_val = document.getElementById("customRange1");
    // console.log(hue_change_val);
    // console.log(hue_change_val.value);
    // this.h = this.h + hue_change_val.value;
    this.h = this.h + path_hue;
    if (this.h > 255) {
      this.h = 0;
    }
    // let val = thickness_slider.value; //Blurry at higher stroke weight...

    strokeWeight(path_thickness);
    //stroke(this.h, 150, max(0,200 * (1 - (this.age / path_length))));
    stroke(this.h, path_saturation, path_brightness, max(0,100 * (1 - (this.age / this.max_age))));
    //stroke(this.h, 150, 150,200);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    // smooth();
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > width / 2 + 50) {
      this.age = 0;
      this.pos = createVector(random(-windowWidth / 2 - 25, windowWidth / 2 + 25), random(-windowHeight / 2 - 25, windowHeight / 2 + 25));
      this.updatePrev();
    }
    if (this.pos.x < -width / 2 - 50) {
      this.age = 0;
      this.pos = createVector(random(-windowWidth / 2 - 25, windowWidth / 2 + 25), random(-windowHeight / 2 - 25, windowHeight / 2 + 25));
      this.updatePrev();
    }
    if (this.pos.y > height / 2 + 50) {
      this.age = 0;
      this.pos = createVector(random(-windowWidth / 2 - 25, windowWidth / 2 + 25), random(-windowHeight / 2 - 25, windowHeight / 2 + 25));
      this.updatePrev();
    }
    if (this.pos.y < -height / 2 - 50) {
      this.age = 0;
      this.pos = createVector(random(-windowWidth / 2 - 25, windowWidth / 2 + 25), random(-windowHeight / 2 - 25, windowHeight / 2 + 25));
      this.updatePrev();
    }

    // var d = dist(0, 0, this.pos.x, this.pos.y);
    // if (d<1) {
    //   this.age = 0;
    //   this.pos = createVector(random(-width/2, width/2), random(-height/2, height/2));
    //   this.updatePrev();
    // }

  }

  this.aging = function() {
    this.age += 1;
  }

  this.checkdeath = function() {
    if (this.age > this.max_age) {
      ran = Math.random(1);
      if (ran > 0.1) {
        this.age = 0;
        this.pos = createVector(random(-windowWidth / 2 - 25, windowWidth / 2 + 25), random(-windowHeight / 2 - 25, windowHeight / 2 + 25));
        this.updatePrev();
      }

    }
  }

}
