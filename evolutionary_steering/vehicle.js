class Vehicle {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxSpeed = 5;
        this.maxForce = 0.5;

        this.health = 1;

        this.dna = [];
        
        // Food desire
        this.dna[0] = random(-5,5);
        // Poison desire
        this.dna[1] = random(-5,5);
    }

    boundaries(){
        
        const d = 25; // Distance from boundary 
        let desired = createVector(0,0);
        
        if (this.position.x<d){
            desired = createVector(this.maxSpeed, this.velocity.y);
        } else if (this.position.x > width-d){
            desired = createVector(-this.maxSpeed, this.velocity.y);
        }

        if (this.position.y<d){
            desired = createVector(this.velocity.x, this.maxSpeed);
        } else if (this.position.y<0){
            desired = createVector(this.velocity.x, -this.maxSpeed);
        }

        return desired;
    }


    // Behaviours triggers eat twice
    // eat triggers seek twice
    
    behaviours(good,bad){
        let steerG = this.eat(good, food_health_gain);
        let steerB = this.eat(bad, -poison_health_loss);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        const combinedSteer = p5.Vector.add(steerG,steerB);
        
        combinedSteer.limit(this.maxForce);
        this.applyForce(combinedSteer);
        
        
        // this.applyForce(steerG);
        // this.applyForce(steerB);
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    applyHunger(){
        this.health -= hunger_rate;
    }

    seek(target){
        const desired = p5.Vector.sub(target,this.position)
        desired.setMag(this.maxSpeed);

        const steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxForce);

        return steer;
    }

    eat(list, health_gain){
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
            this.health += health_gain;
        } else if (closestIdx > -1) {
            return this.seek(list[closestIdx]);
        }

        return createVector(0,0);
    }

    dead(){
        return (this.health <= 0);
    }

    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);   
    }

    show(){
        const angle = this.velocity.heading()+Math.PI/2;
        

        push();
        translate(this.position.x,this.position.y);
        rotate(angle);

        if (debug){
            stroke(0,255,0);
            strokeWeight(1);
            line(1,0,1,-this.dna[0]*20);
            stroke(255,0,0);
            strokeWeight(1);
            line(-1,0,-1,-this.dna[1]*20);
        }

        strokeWeight(1);
        stroke(255);

        const gr = color(0,255,0);
        const rd = color(255,0,0);
        const col = lerpColor(rd,gr, this.health);

        fill(col);
        beginShape();
        vertex(0,-vehicle_length);
        vertex(-vehicle_width,vehicle_length);
        vertex(vehicle_width,vehicle_length);
        endShape(CLOSE);
        pop();
    }

}