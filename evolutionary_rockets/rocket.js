const ROCKET_WIDTH = 10;
const ROCKET_HEIGHT = 30;
const ROCKET_BOTTOM_DELTA = 2;
const ROCKET_LIFESPAN = 500;

class Rocket {
    constructor(dna) {
        this.position = createVector(width/2, height);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.fitness = 0;
        this.age = 0;
        this.fillColor = [250,250,250];
        this.crashed = false;
        this.reachedTarget = false;
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
        if (!this.reachedTarget && !this.crashed){
            this.applyForce(this.dna.genes[counter]);
    
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);

            this.age++;
        }
    }


    pointInPolygon(point, polygon) {
        let inside = false;
        const x = point.x;
        const y = point.y;
      
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          const xi = polygon[i][0];
          const yi = polygon[i][1];
          const xj = polygon[j][0];
          const yj = polygon[j][1];
      
          const crossesY = (yi > y) !== (yj > y);
          const crossingX = ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      
          if (crossesY && x < crossingX) {
            inside = !inside;
          }
        }
      
        return inside;
      }

    naiveCheckCollision(obstacles){
        // check if the rocket has crashed into an obstacle

        // (left, up) top left : 0
        // (right, up) top right : 1
        // (right, down) bottom right : 2
        // (left, down) bottom left : 3


        obstacles.forEach(obstacle => {
            const obstacleBounds = returnObstacleBounds(obstacle);

            if (
                (this.position.x > obstacleBounds[0][0] && this.position.x < obstacleBounds[1][0]) && 
                (this.position.x > obstacleBounds[3][0] && this.position.x < obstacleBounds[2][0]) && 
                (this.position.y > obstacleBounds[0][1] && this.position.y > obstacleBounds[1][1]) &&
                (this.position.y < obstacleBounds[3][1] && this.position.y < obstacleBounds[2][1])
            ) {
                this.crashed = true;
                this.fillColor = [255,0,0];
            }
        })
    }

    checkCollision(obstacles){
        // check if the rocket has crashed into an obstacle with ray casting

        obstacles.forEach(obstacle => {
            const polygon = returnObstacleBounds(obstacle);

            if (this.pointInPolygon(this.position, polygon)) {
                this.crashed = true;
                this.fillColor = [255,0,0];
            }
        })
    }

    distanceToTarget(target){
        return dist(this.position.x, this.position.y, target.x, target.y);
    }

    checkAtTarget(target){
        // check if the rocket has reached the target

        if (this.distanceToTarget(target) < 10){
            this.reachedTarget = true;
            this.fillColor = [0,255,0];
        }
    }

    calculateFitness(){
        const d = dist(this.position.x, this.position.y, target.x, target.y);
        this.fitness = 1/d * (this.age/ROCKET_LIFESPAN);

        if (this.crashed){
            this.fitness *= 1; // penalize crashed rockets
        } else {
            this.fitness *= 2; // reward reached target rockets
        }
    }

    show(){
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading()+Math.PI/2);
        rectMode(CENTER);
        noStroke();
        fill(this.fillColor[0], this.fillColor[1], this.fillColor[2], 100);
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