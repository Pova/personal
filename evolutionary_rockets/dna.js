

class DNA {
    constructor() {
        this.genes = [];
        for (let i = 0; i < ROCKET_LIFESPAN; i++) {
            this.genes.push(p5.Vector.random2D());
            this.genes[i].setMag(random(0,1));
        }
    }
}