const ROCKET_WIDTH = 10;
const ROCKET_HEIGHT = 30;
const ROCKET_BOTTOM_DELTA = 2;
const ROCKET_LIFESPAN = 200;

class Rocket {
    constructor(dna) {
        this.position = createVector(width/2, height);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.fitness = 0;
        if (dna){
            this.dna = dna;
        } else {
            this.dna = new DNA();
        }
    }


    applyForce(force){
        this.acceleration.add(force);
    }

    update(){
        this.applyForce(this.dna.genes[counter]);

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);   
    }

    calculateFitness(){
        const d = dist(this.position.x, this.position.y, target.x, target.y);
        this.fitness = 1/d;
    }

    show(){
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading()+Math.PI/2);
        rectMode(CENTER);
        noStroke();
        fill(250,250,250,200);
        rect(0,0,ROCKET_WIDTH,ROCKET_HEIGHT);
        triangle(
            -ROCKET_WIDTH/2,-ROCKET_HEIGHT/2, 
            ROCKET_WIDTH/2,-ROCKET_HEIGHT/2, 
            0,-(ROCKET_HEIGHT+ROCKET_WIDTH*sqrt(3))/2
        );
        quad(
            -ROCKET_WIDTH/2, ROCKET_HEIGHT/2, // left bottom of rect
            ROCKET_WIDTH/2, ROCKET_HEIGHT/2, // right bottom of rect
            ROCKET_WIDTH/2 + ROCKET_BOTTOM_DELTA,ROCKET_HEIGHT/2 + ROCKET_BOTTOM_DELTA*5, // below right bottom
            -ROCKET_WIDTH/2 - ROCKET_BOTTOM_DELTA, ROCKET_HEIGHT/2 + ROCKET_BOTTOM_DELTA*5 // below left bottom
        );
        pop();
    }

}