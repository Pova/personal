class Boid {
    constructor() {
        this.position = createVector(random(0,width), random(0,height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5,1.5));
        this.acceleration = createVector();
        this.maxForce = 0.01;
    }

    align(boids){
        let steering = createVector();
        let total = 0;
        for (let other of boids){
            const d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && d<perception){
                steering.add(other.velocity);
                total++;
            }
        }
        if (total>0){
            steering.div(total);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
        
    }

    flock_calculation(flock){
        const alignment = this.align(flock);
        this.acceleration = alignment;
    }

    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.setMag(0);   
    }

    show(){
        push();
        stroke(255);
        translate(this.position.x,this.position.y);
        rectMode(CENTER);
        rotate(this.velocity.heading()+Math.PI/2);
        triangle(0,-boid_length/2,
        -boid_width/2,boid_length/2,
        boid_width/2,boid_length/2,
        );
        pop();
    }

}