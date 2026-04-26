const BIOMES = {
    DESERT: {
        name: 'Desert',
        threshold: 0.32,
        foodWeight: 0.35,
        poisonWeight: 0.25,
        color: [120, 95, 45]
    },
    FOREST: {
        name: 'Forest',
        threshold: 0.68,
        foodWeight: 1,
        poisonWeight: 0.55,
        color: [30, 90, 40]
    },
    SWAMP: {
        name: 'Swamp',
        threshold: 1,
        foodWeight: 1.4,
        poisonWeight: 1.5,
        color: [45, 65, 50]
    }
};

class Environment {
    constructor(worldWidth, worldHeight, boundaryPad, options = {}) {
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.boundaryPad = boundaryPad;
        this.tileSize = options.tileSize || 25;
        this.noiseScale = options.noiseScale || 0.006;
        this.seed = options.seed || random(100000);
        this.biomes = [BIOMES.DESERT, BIOMES.FOREST, BIOMES.SWAMP];
    }

    getBiomeAt(x, y) {
        const value = noise(
            (x + this.seed) * this.noiseScale,
            (y + this.seed) * this.noiseScale
        );

        for (let i = 0; i < this.biomes.length; i++){
            if (value < this.biomes[i].threshold){
                return this.biomes[i];
            }
        }

        return BIOMES.SWAMP;
    }

    draw() {
        push();
        noStroke();

        for (let x = 0; x < this.worldWidth; x += this.tileSize){
            for (let y = 0; y < this.worldHeight; y += this.tileSize){
                const biome = this.getBiomeAt(x + this.tileSize / 2, y + this.tileSize / 2);
                fill(biome.color[0], biome.color[1], biome.color[2]);
                rect(x, y, this.tileSize, this.tileSize);
            }
        }
        pop();
    }

    randomPointForResource(resourceType) {
        const weightKey = resourceType === 'poison' ? 'poisonWeight' : 'foodWeight';
        const maxWeight = this.getMaxWeight(weightKey);
        const maxAttempts = 100;

        for (let i = 0; i < maxAttempts; i++){
            const point = this.randomPoint();
            const biome = this.getBiomeAt(point.x, point.y);

            if (random(1) < biome[weightKey] / maxWeight){
                return point;
            }
        }

        return this.randomPoint();
    }

    randomPoint() {
        return createVector(
            random(this.boundaryPad, this.worldWidth - this.boundaryPad),
            random(this.boundaryPad, this.worldHeight - this.boundaryPad)
        );
    }

    getMaxWeight(weightKey) {
        return this.biomes.reduce((maxWeight, biome) => Math.max(maxWeight, biome[weightKey]), 0);
    }
}
