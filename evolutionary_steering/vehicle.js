class Vehicle {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxForce = 0.5;
        this.maxSpeed = 5;
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

    seek(target){
        const desired = p5.Vector.sub(target,this.position)
        desired.setMag(this.maxSpeed);

        const steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxForce);

        this.applyForce(steer);
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    eat(list){
        let closestIdx = -1;
        let min_dist = Infinity;
        for (let i=0;i<list.length;i++){
            const d = this.position.dist(food[i].x,food[i].y);
            if (d<min_dist){
                min_dist = d;
                closestIdx = i;
            }
        }

        this.seek(food[closestIdx]);
    }

    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
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