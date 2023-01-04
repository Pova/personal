// var flee_force = 1.5;
var G = 1; //Gravitational constant

// Could add random weights to each particle

function Vehicle(x, y) { //constructor for Vehicle class, attracted to (x,y)
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
    var desired = p5.Vector.sub(target, this.pos); //Vector from this.pos to target
    var d = desired.mag();
    var force = maxDesired;
    if (d < 50) { //distance to target is less than initial distance
       var force = map(d, 0, 50, 0, maxDesired);
    }
    desired.limit(force);
    var steer = p5.Vector.sub(desired, this.vel); // vector from this.vel to desired
    steer.limit(maxSteer);
    return steer;
}

Vehicle.prototype.flee = function(target) { //Returns flee force away from target
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

Vehicle.prototype.applyForce = function(f) { //adds forces to acceleration
    this.acc.add(f);
}

// Vehicle.prototype.gravity = function(a, b) { //Returns the correct force to attract a to b
//     // a and b will be vehicle objects
//     var maxGrav = 5; //Max gravity force
//     var a_to_b = p5.Vector.sub(b, a);
//     var dist = a_to_b.mag();
//     if (dist>1){
//       var g = a_to_b.mult(G / (dist * dist)); //the force of gravity pushing a to b
//       // g.limit(this.maxForce);
//       g.limit(maxGrav);
//       return g;
//     }
//     else{
//       return createVector();
//     }
//
// }

// Main loop: behaviors --> update --> show

Vehicle.prototype.behaviours = function() { //Applies behaviours
    var arrive = this.arrive(this.target);
    //var gravity = this.gravity(this.pos, this.target)
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    //Could weight forces in a different way here.

    this.applyForce(arrive);
    //this.applyForce(gravity);
    this.applyForce(flee);
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel); //update position
    this.vel.add(this.acc);
    //this.vel.limit(100);
    this.acc.mult(0);
}

Vehicle.prototype.show = function() {

    push();
    colorMode(HSB);
    stroke(this.hue % 360,255,255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
    pop();
}
