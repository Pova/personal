//constructor for Vehicle class, attracted to (x,y)
function Vehicle(x, y) { 
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(2);
    this.acc = createVector(); //initially 0 acc
    this.target = createVector(x, y);
    this.max_d = p5.Vector.dist(this.pos, this.target);
    this.init_d = p5.Vector.dist(this.pos, this.target);
    this.hue = 200;

}

Vehicle.prototype.arrive = function(target) {
    var maxDesired = max_desired; // from sliders
    var maxSteer = max_steer; // from sliders
    var desired = p5.Vector.sub(target, this.pos); // this.pos --> target
    var d = desired.mag();
    var force = maxDesired;
    if (d < 50) { 
       var force = map(d, 0, 50, 0, maxDesired);
    }
    desired.limit(force);
    var steer = p5.Vector.sub(desired, this.vel); // this.vel --> desired
    steer.limit(maxSteer);
    return steer;
}

//Returns flee force away from target
Vehicle.prototype.flee = function(target) { 
    var fleeDist = flee_dist; // from sliders
    var fleeForce = flee_force; // from sliders
    var desired = p5.Vector.sub(target, this.pos);
    var d = p5.Vector.dist(target, this.pos);
    if (d < fleeDist) {
        force = map(d, 0, fleeDist, fleeForce, 0)
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.setMag(force);
        this.hue += steer.mag()*0.1;
        return steer;
    } else {
        steer = createVector();
        return steer;
    }
}

//adds forces to acceleration
Vehicle.prototype.applyForce = function(f) { 
    this.acc.add(f);
}

// Main loop: behaviors --> update --> show

Vehicle.prototype.behaviours = function() { //Applies behaviours
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);
    this.applyForce(arrive);
    this.applyForce(flee);
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Vehicle.prototype.show = function() {

    push();
    colorMode(HSB);
    stroke(this.hue % 360,255,255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
}
