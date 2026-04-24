class Player extends Vehicle {

    constructor(x, y, width, length, type) {
        super(x, y, width, length);

        this.controls = new Controls(type);
        this.speed = 0;
        this.color = 'red'

        this.acceleration = 0.02;
        this.friction = 0.005;
        this.maxSpeed = 2;
        this.maxTurnSpeed = 0.02;
        this.damaged = false;

        this.sensor = new Sensor(this);
        this.brain = new NeuralNetwork(
            [this.sensor.rayCount,6,4]
        ); //6 neurons in hidden layer

        if (type=='AI'){
            this.useBrain = true;
        }
        
    }

    update(path,traffic){
        if (this.sensor){
            this.sensor.sensorUpdate(path,traffic);
            const offsets = this.sensor.readings.map(
                s =>s==null?0:1-s.offset
            );
            const outputs = NeuralNetwork.feedForward(offsets,this.brain);
        if (this.useBrain){
            this.controls.forward = outputs[0]==1;
            this.controls.right = outputs[1]==1;
            this.controls.backward = outputs[2]==1;
            this.controls.left = outputs[3]==1;
        }
    }

        // check for collisions
        this.#collisionCheck();

        // handle movement
        if (!this.damaged){
            this.#handleMovement();
        }
        
        
    }

    #handleMovement(){
        if (this.controls.forward){
            this.speed += this.acceleration;
        }
        if (this.controls.backward){
            this.speed -= this.acceleration;
            
        }

        // max speed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        } else if (this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed;
        }

        // translate car position based on speed and direction
        this.y -=  this.speed * Math.cos(this.direction).toFixed(2);
        this.x +=  this.speed * Math.sin(this.direction).toFixed(2);

        // apply friction
        if (this.speed > 0) {
            this.speed -= this.friction;
            if (this.speed < this.friction) {
                this.speed = 0;
            }
        } else if (this.speed < 0) {
            this.speed += this.friction;
            if (this.speed > -this.friction) {
                this.speed = 0;
            }
        }

        // only allow turning if the car is moving
        if (this.speed != 0) {
            let flip = this.speed < 0 ? -1 : 1;
            let turnSpeed = Math.min(Math.abs(this.speed) * 0.02, this.maxTurnSpeed )

            if (this.controls.left){
                this.direction -= turnSpeed * flip;
            }
            if (this.controls.right){
                this.direction += turnSpeed * flip;
            }
        }

    }

    #collisionCheck(){
        // check for collision with road boarders
        path.roads.forEach(road => {
            road.borders.forEach(border => {
                if (polysIntersect(this.getPolygon(), border) 
                || Math.abs(this.x-roadCanvas.width/2)>roadCanvas.width/2 //fixes off screen car bug
                ){
                    this.damaged = true;
                    this.color = 'grey'
                    // check if all cars are damanged
                    const allCarsDamaged = cars.every(car => car.damaged);
                    if (allCarsDamaged) {
                        play = false;
                      }
                }
            })  
        })

        // check for collision with other cars
        traffic.vehicles.forEach(car => {
            if (polysIntersect(this.getPolygon(), car.getPolygon())){
                this.damaged = true;
                this.color = 'grey'
                // check if all cars are damanged
                const allCarsDamaged = cars.every(car => car.damaged);
                if (allCarsDamaged) {
                    play = false;
                  }
            }
        })
    }
}