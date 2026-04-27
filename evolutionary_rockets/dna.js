

class DNA {
    constructor(genes) {
        if (genes){
            this.genes = genes;
        } else{
            this.genes = [];
            for (let i = 0; i < ROCKET_LIFESPAN; i++) {
                this.genes.push(p5.Vector.random2D());
                this.genes[i].setMag(random(0,1));
            }
        }
    }

    crossover(partner) {
        let newGenes = [];
        let midpoint = floor(random(this.genes.length));
        for (let i = 0; i < this.genes.length; i++){
            if (i > midpoint){
                newGenes[i] = this.genes[i];
            }
            else {
                newGenes[i] = partner.genes[i];
            }
        }
    
        return new DNA(newGenes)
    }
}