//constructor for Vehicle class, attracted to (x,y)
class Vehicle {
    constructor(x, y){
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D().mult(2);
        this.acc = createVector(); //initially 0 acc
        this.target = createVector(x, y);
        this.max_d = p5.Vector.dist(this.pos, this.target);
        this.init_d = p5.Vector.dist(this.pos, this.target);
        this.hue = 200;
    }

    arrive(target) {
    const maxDesired = max_desired; // from sliders
    const maxSteer = max_steer; // from sliders
    let desired = p5.Vector.sub(target, this.pos); // this.pos --> target
    const  d = desired.mag();
    let force = maxDesired;
    if (d < 50) { 
       force = map(d, 0, 50, 0, maxDesired);
    }
    desired.limit(force);
    let steer = p5.Vector.sub(desired, this.vel); // this.vel --> desired
    steer.limit(maxSteer);
    return steer;
}

//Returns flee force away from target
flee(target) { 
    const fleeDist = flee_dist; // from sliders
    const fleeForce = flee_force; // from sliders
    let desired = p5.Vector.sub(target, this.pos);
    const d = p5.Vector.dist(target, this.pos);
    if (d < fleeDist) {
        let force = map(d, 0, fleeDist, fleeForce, 0)
        desired.mult(-1);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.setMag(force);
        this.hue = (this.hue + steer.mag()*0.1)%255;
        return steer;
    } else {
        const steer = createVector();
        return steer;
    }
}

//adds forces to acceleration
applyForce(f) { 
    this.acc.add(f);
}

// Main loop: behaviors --> update --> show

behaviours() { //Applies behaviours
    const arrive = this.arrive(this.target);
    const mouse = createVector(mouseX, mouseY);
    const flee = this.flee(mouse);
    this.applyForce(arrive);
    this.applyForce(flee);
}

update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

show() {

    push();
    colorMode(HSB);
    stroke(this.hue,255,255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
}

}
