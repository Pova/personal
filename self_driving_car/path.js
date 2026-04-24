class Path {
    constructor(sx, sy, height) {
        this.sx = sx;
        this.sy = sy;
        this.height = height;
        this.top = this.sy;
        this.roads = [];

        for (let i = -4; i < 1; i++) {
            this.#addNewRoad(this.sx, this.sy - (i * this.height), this.height);
        }
    }
    
    update() {
        // add new roads ahead and removes previous roads off screen
        if (bestCar.y - roadCanvas.height < this.top) {
            this.#addNewRoad(this.sx, this.top - this.height, this.height);
            this.top -= this.height;
            this.roads.shift();
        }
    }

    draw() {
        this.roads.forEach(road => road.draw());
    }

    #addNewRoad(x, y, height) {
        this.roads.push(new Road(x, y, height));
    }
    
}