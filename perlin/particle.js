function Particle(x,y) {
  if (x && y) {
    this.pos = createVector(x, y);
  } else {
    this.pos = createVector(random(-windowWidth / 2, windowWidth / 2), random(-windowHeight / 2, windowHeight / 2));
  }
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.h = 0;
  this.prevPos = this.pos.copy();
  this.age = 0;
  this.max_age = 5000;

  //Updating position of particle

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(path_effect);
    this.pos.add(this.vel);
    this.acc.mult(0); 
  }


  this.follow = function() {
    const vectors = flowfield;
    const x = floor((this.pos.x + width / 2) / scl);
    const y = floor((this.pos.y + height / 2) / scl);
    const index = x + y * cols;
    const force = vectors[index];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    this.h = this.h + path_hue;
    if (this.h > 255) {
      this.h = 0;
    }

    strokeWeight(path_thickness);
    //stroke(this.h, path_saturation, path_brightness); //experimenting with alpha values
    stroke(this.h, path_saturation, path_brightness, max(0,100 * (1 - (this.age / this.max_age))));
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.check_off_canvas = function() {
    if (this.pos.x > width / 2) {
      return true;
    }
    if (this.pos.x < -width / 2) {
      return true;
    }
    if (this.pos.y > height / 2) {
      return true;
    }
    if (this.pos.y < -height / 2) {
      return true;
    }
    return false;
  }

  this.edges_w_respawn = function() {
    if (this.pos.x > width / 2) {
      this.age = 0;
      this.pos = createVector(random(-windowWidth / 2 - 25, windowWidth / 2 + 25), random(-windowHeight / 2 - 25, windowHeight / 2 + 25));
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
    if (this.pos.x < -width / 2) {
      this.age = 0;
      this.pos = createVector(random(-windowWidth / 2 - 25, windowWidth / 2 + 25), random(-windowHeight / 2 - 25, windowHeight / 2 + 25));
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
    if (this.pos.y > height / 2) {
      this.age = 0;
      this.pos = createVector(random(-windowWidth / 2 - 25, windowWidth / 2 + 25), random(-windowHeight / 2 - 25, windowHeight / 2 + 25));
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
    if (this.pos.y < -height / 2) {
      this.age = 0;
      this.pos = createVector(random(-windowWidth / 2 - 25, windowWidth / 2 + 25), random(-windowHeight / 2 - 25, windowHeight / 2 + 25));
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
  }


  this.aging = function() {
    this.age += 1;
  }

  this.checkdeath = function() {
    // if the particle is older than max age, respawn it (90% of the time)
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