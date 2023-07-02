class Vehicle {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxSpeed = 5;
        this.maxForce = 0.5;

        this.dna = [];
        
        // Food desire
        this.dna[0] = random(-5,5);
        // Poison desire
        this.dna[1] = random(-5,5);
    }

    // Need to update this
    // edges(){
    //     if (this.position.x>width){
    //         this.position.x = 0;
    //     } else if (this.position.x<0){
    //         this.position.x = width;
    //     }
    //     if (this.position.y>height){
    //         this.position.y = 0;
    //     } else if (this.position.y<0){
    //         this.position.y = height;
    //     }
    // }

    behaviours(good,bad){
        let steerG = this.eat(good);
        let steerB = this.eat(bad);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);
    }

    applyForce(force){
        this.acceleration.add(force);
    }


    seek(target){
        const desired = p5.Vector.sub(target,this.position)
        desired.setMag(this.maxSpeed);

        const steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxForce);

        return steer;
    }

    eat(list){
        let closestIdx = -1;
        let min_dist = Infinity;
        for (let i=0;i<list.length;i++){
            const d = this.position.dist(list[i]);
            if (d<min_dist){
                min_dist = d;
                closestIdx = i;
            }
        }

        // Eats food if close enough
        if (min_dist < 5){
            list.splice(closestIdx,1);
        } else if (closestIdx > -1) {
            return this.seek(list[closestIdx]);
        }

        return createVector(0,0);

        
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