

class Population {
    constructor(size) {
        this.rockets = [];
        this.matingPool = [];
        this.generation = 1;
        this.averageFitness = 0;

        for (let i = 0; i < size; i++) {
            this.rockets.push(new Rocket());
        }
    }

    update() {
        this.rockets.forEach(rocket => rocket.update());
    }

    evaluate() {
        let maxFitness = 0;
        let totalFitness = 0;
        
        this.rockets.forEach(rocket => {
            rocket.calculateFitness();
            totalFitness += rocket.fitness;
        
            if (rocket.fitness > maxFitness){
                maxFitness = rocket.fitness;
            }
        });

        this.averageFitness = totalFitness / this.rockets.length;
    
        this.rockets.forEach(rocket => {
            rocket.normalizedFitness = rocket.fitness / maxFitness;
        });

        this.matingPool = []; // reset mating pool

        this.rockets.forEach(rocket => {
            let n = rocket.fitness * 100;
            for (let j = 0; j < n; j++) {
                this.matingPool.push(rocket);
            }
        })
    
    }
    
    selection() {

        let newRockets = [];

        this.rockets.forEach(rocket => {
            let parentA = random(this.matingPool).dna;
            let parentB = random(this.matingPool).dna;
    
            let child = parentA.crossover(parentB);

            newRockets.push(new Rocket(child))
        })

        this.rockets = newRockets;
        this.generation++;
    }

    show() {
        this.rockets.forEach(rocket => rocket.show());
    }
}