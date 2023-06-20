class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxForce = .2;
        this.maxSpeed = 3;
    }

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

    behaviours(boids){
        let align_steering = createVector();
        let cohesion_steering = createVector();
        let separation_steering = createVector();
        let total = 0;
        for (let other of boids){
            const d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && d<perception){
                // Alignment 
                align_steering.add(other.velocity);
                // Cohesion
                cohesion_steering.add(other.position);
                // Separation
                const diff = p5.Vector.sub(this.position,other.position);
                diff.div(d);
                separation_steering.add(diff);

                total++;
            }
        }
        if (total>0){
            // Alignment behaviours
            align_steering.div(total);
            align_steering.setMag(this.maxSpeed);
            align_steering.sub(this.velocity);
            align_steering.limit(this.maxForce);
            
            align_steering.mult(boid_alignment/50);
            
            // Cohesion behaviours
            cohesion_steering.div(total);
            cohesion_steering.sub(this.position);
            cohesion_steering.setMag(this.maxSpeed);
            cohesion_steering.sub(this.velocity);
            cohesion_steering.limit(this.maxForce);
            
            cohesion_steering.mult(boid_cohesion/50);
            
            // Separation behaviours
            separation_steering.div(total);
            separation_steering.setMag(this.maxSpeed);
            separation_steering.sub(this.velocity);
            separation_steering.limit(this.maxForce/50);
            
            separation_steering.mult(boid_separation);
        }
        return [align_steering,cohesion_steering,separation_steering]; 
    }

    flock_calculation(flock){
        const behaviours = this.behaviours(flock);
        for (let force of behaviours){
            this.acceleration.add(force);
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
        triangle(0,-boid_length/2,
        -boid_width/2,boid_length/2,
        boid_width/2,boid_length/2,
        );
        pop();
    }

}