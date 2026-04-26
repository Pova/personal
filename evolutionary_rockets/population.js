

class Population {
    constructor(size) {
        this.rockets = [];
        for (let i = 0; i < size; i++) {
            this.rockets.push(new Rocket(width/2, height));
        }
    }

    update() {
        this.rockets.forEach(rocket => rocket.update());
    }

    show() {
        this.rockets.forEach(rocket => rocket.show());
    }
}