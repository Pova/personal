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

    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);   
    }

    show(){
        // Code
    }

}