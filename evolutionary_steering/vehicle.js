class Vehicle {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxForce = .2;
        this.maxSpeed = 3;
    }

    // Need to update this
    edges(){
        if (this.position.x>width){
            this.position.x = 0;
        } else if (this.position.x<0){
            this.position.x = width;
        }
        if (this.position.y>height){
            this.position.y = 0;
        } else if (this.position.y<0){
            this.position.y = height;
        }
    }

    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.limit(this.maxSpeed)
        this.acceleration.mult(0);   
    }

    show(){
        push();
        stroke(255);
        translate(this.position.x,this.position.y);
        rectMode(CENTER);
        rotate(this.velocity.heading()+Math.PI/2);
        triangle(0,-vehicle_length/2,
        -vehicle_width/2,vehicle_length/2,
        vehicle_width/2,vehicle_length/2,
        );
        pop();
    }

}