class Vehicle {
    constructor(
        x = random(width), 
        y = random(height), 
        generation = 0, 
        dna = null
    ) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxSpeed = 5; 
        this.maxForce = 0.5; // caps steering in seek() and search_and_eat_behaviours(); shapes turn rate and paths (triangle motion), not drawn explicitly in show()

        // improvement idea: split health into:
        // --------------------------------------------
        // energy
        // age
        // metabolism (perception radius)
        // speedCost
        // reproductionCost (requires stored energy)
        // --------------------------------------------
        
        this.generation = generation;
        this.age = 0;
    
        if (dna === null) {
            this.dna = [];
            
            this.dna[0] = random(-5,5); // Food desire
            this.dna[1] = random(-5,5); // Poison desire
            
            this.dna[2] = random(MIN_PERCEPTION_RADIUS,MAX_PERCEPTION_RADIUS); // Food perception (downside: costs more energy to sustain)
            this.dna[3] = random(MIN_PERCEPTION_RADIUS,MAX_PERCEPTION_RADIUS); // Poison perception (downside: costs more energy to sustain)
            
            this.dna[4] = random(0,1); // Mutation rate
            
            this.dna[5] = random(1, MAX_SPEED); // maxSpeed (can move faster but will make hunger rate faster)
            this.dna[6] = random(0, 1); // reproductionCost (higher cost means less likely to reproduce but children more likely to survive)
            this.dna[7] = random(0, 1); // poisonTolerance (downside?)
            this.dna[8] = random(0, 2); // startingHealth
        } else {
            this.dna = dna.slice();
        }

        this.setStartingValues();
    }

    setStartingValues(){
        this.foodDesire = this.dna[0];
        this.poisonDesire = this.dna[1];
        this.foodPerceptionRadius = this.dna[2];
        this.poisonPerceptionRadius = this.dna[3];
        this.mutationRate = this.dna[4];
        this.maxSpeed = this.dna[5];
        this.reproductionCost = this.dna[6];
        this.poisonTolerance = this.dna[7];
        this.health = this.dna[8];
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    applyHunger(){

        const perceptionCost = (this.foodPerceptionRadius/MAX_PERCEPTION_RADIUS)
        const speedCost = (this.maxSpeed/MAX_SPEED)
        const totalCost = perceptionCost + speedCost + 1
        const adjustedHungerRate = hunger_rate * totalCost
        
        this.health -= adjustedHungerRate;
    }

    dead(){
        return (this.health <= 0);
    }

    clone(){
        if (random(1) < 0.00125){
            return new Vehicle(this.position.x, this.position.y, this.generation + 1, this.dna);
        } else { 
            return null;
        }
    }

    clone_and_mutate(){
        if (random(1) < CLONE_ATTEMPT_RATE){
            // check the health
            if (this.health > this.reproductionCost){
                // has enough health to reproduce
                if (random(1) < this.mutationRate){
                    // mutate the dna
                    return new Vehicle(this.position.x, this.position.y, this.generation + 1, this.dna);
                } else {
                    // regular clone
                    return new Vehicle(this.position.x, this.position.y, this.generation + 1, this.mutate(this.dna));
                }
            } else {
                // dies in the attempt
                this.health = 0;
                return null;
            }
        } else {
            return null;
        }
    }

    
    mutate(dna){

        const newDna = dna.slice();

        const indexToMutate = floor(random(dna.length));

        // want different mutation rules for different indices

        switch (indexToMutate){
            case 0: // Food desire
                newDna[indexToMutate] = constrain(dna[indexToMutate] + random(-0.5,0.5),-5, 5);
                break;
            case 1: // Poison desire
                newDna[indexToMutate] = constrain(dna[indexToMutate] + random(-0.5,0.5), -5, 5);
                break;
            case 2: // Food perception
                // remove limit on max perception - see if this evolves to grow
                newDna[indexToMutate] = constrain(dna[indexToMutate] + random(-10,10), MIN_PERCEPTION_RADIUS);
                break;
            case 3: // Poison perception
                // remove limit on max perception - see if this evolves to grow
                newDna[indexToMutate] = constrain(dna[indexToMutate] + random(-10,10), MIN_PERCEPTION_RADIUS);
                break;
            case 4: // Mutation rate
                newDna[indexToMutate] = constrain(dna[indexToMutate] + random(-0.1,0.1), 0.0, 1.0);
                break;
            case 5: // maxSpeed
                newDna[indexToMutate] = constrain(dna[indexToMutate] + random(-1,1), 0);
                break;
            case 6: // reproductionCost
                newDna[indexToMutate] = constrain(dna[indexToMutate] + random(-0.1,0.1), 0.0);
                break;
            case 7: // poisonTolerance
                newDna[indexToMutate] = constrain(dna[indexToMutate] + random(-0.1,0.1), 0.0);
                break;
            case 8: // startingHealth
                newDna[indexToMutate] = constrain(dna[indexToMutate] + random(-0.1,0.1), 0.0);
                break;
        }

        return dna;
    }

    apply_boundary_forces(){
        
        const d = 25; // Distance from boundary 
        let desired = createVector(0,0);
        
        if (this.position.x<d){
            desired = desired.add(createVector(this.maxSpeed, this.velocity.y));
        } else if (this.position.x > width-d){
            desired = desired.add(createVector(-this.maxSpeed, this.velocity.y));
        }

        if (this.position.y<d){
            desired = desired.add(createVector(this.velocity.x, this.maxSpeed));
        } else if (this.position.y > height-d){
            desired = desired.add(createVector(this.velocity.x, -this.maxSpeed));
        }

        // Apply force to vehicle

        if (desired.mag() > 0){
            if (debug){
                console.log("Hit boundary!");
                console.log("old velocity: ", this.velocity.x, this.velocity.y);
            }
            desired.normalize();
            desired.mult(this.maxSpeed);
            let steer = p5.Vector.sub(desired, this.velocity);
            
            // No max force limit here - want to allow for immediate correction of direction
            // steer.limit(this.maxForce);
            
            this.applyForce(steer);
            if (debug){
                console.log("desired: ", steer.x, steer.y);
            }
        }
    }

    // Behaviours triggers eat twice
    // eat triggers seek twice
    
    search_and_eat_behaviours(good,bad){
        // good is food (array)
        // bad is poison (array)

        let steerG = this.searching_behaviour(good, food_health_gain, this.dna[2]);
        let steerB = this.searching_behaviour(bad, -poison_health_loss, this.dna[3]);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        const combinedSteer = p5.Vector.add(steerG,steerB);
        
        combinedSteer.limit(this.maxForce);
        this.applyForce(combinedSteer);
        
    }

    seek(target){
        const desired = p5.Vector.sub(target,this.position)
        desired.setMag(this.maxSpeed);

        const steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxForce);

        return steer;
    }

    searching_behaviour(list, health_effect, perception_radius){
        
        let min_dist = Infinity;
        let closest = null;
        
        // scan across all food/poison
        for (let i = list.length - 1; i >= 0; i--){
            const d = this.position.dist(list[i]); // distance to food/poison
            
            // if close enough, eat and remove from list
            if (d < this.maxSpeed){
                list.splice(i,1);
                this.health += health_effect;
            } else {
                if (d < perception_radius && d<min_dist){
                    min_dist = d;
                    closest = list[i];
                }
            }
        }
            
        if (closest != null) {
            return this.seek(closest);
        }

        return createVector(0,0);
    }



    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);

        if (this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height){
            console.log("Vehicle out of bounds!");
            console.log("position: ", this.position.x, this.position.y);
            console.log("velocity: ", this.velocity.x, this.velocity.y);
        }

        this.acceleration.mult(0);
        this.age += 1;
    }

    show(){
        const angle = this.velocity.heading()+Math.PI/2;
        

        push();
        translate(this.position.x,this.position.y);
        rotate(angle);

        if (debug){
            noFill();

            strokeWeight(2);
            stroke(0,255,0);
            // Visualize food desire
            line(1,0,1,-this.dna[0]*20);
            // Visualize food perception
            ellipse(0,0,this.dna[2]*2);

            stroke(255,0,0);
            strokeWeight(1);
            // Visualize poison desire
            line(-1,0,-1,-this.dna[1]*20);
            // Visualize poison perception
            ellipse(0,0,this.dna[3]*2);
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