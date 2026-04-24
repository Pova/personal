class Traffic {
    constructor() {
        this.vehicles = [];
        this.trafficSpacing = 300;
        this.yVariance = 350;
        this.emptyLanes = 2;
        this.top = 0 + (bestCar.y/2);
    }


    update() {
        this.top -= 1 // move top with traffic 

        // add traffic ahead 
        if (bestCar.y - (roadCanvas.height) < this.top) {
            this.addNewTraffic();
            this.top -= this.trafficSpacing;
        }

        // remove traffic behind 
        this.vehicles.forEach((vehicle, index) => {
            if (vehicle.y > bestCar.y + roadCanvas.height / 2) {
                this.vehicles.splice(index, 1)
            }
            vehicle.update()
        });
    }


    draw() {
        this.vehicles.forEach(vehicle => vehicle.draw());
    }

    
    addNewTraffic() {
        let laneNums = [];
        for (let i = 0; i < laneCount; i++) {
            laneNums.push(i);
        }
        laneNums = shuffleArray(laneNums);
        laneNums.splice(0, this.emptyLanes)

        const leftside = centerx - (laneWidth * laneCount)/2;
        
        laneNums.forEach( laneNum => {
            this.vehicles.push(
                new Vehicle(
                    leftside + ((laneNum + 0.5) * laneWidth),
                    this.top + (Math.random() * (this.yVariance / 2) - this.yVariance),
                    30,
                    50,
                )
            )
        })
    }


}