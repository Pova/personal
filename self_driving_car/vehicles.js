class Vehicle {
    constructor(x, y, width, length, type='npc') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.length = length;
        this.color = 'blue';
        this.speed = 1;
        this.maxSpeed = 1;
        this.direction = 0;

        this.controls = new Controls(type);
        this.sensor = null; //traffic has no sensors

        this.useBrain = false;
    }

    update() {
        this.y -= this.speed;
    }

    draw(context,drawSensor=false) {
        roadCtx.fillStyle = this.color;
        
        const points = this.getPolygon();
        roadCtx.beginPath();
        roadCtx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            roadCtx.lineTo(points[i].x, points[i].y);
        }
        roadCtx.closePath();
        roadCtx.fill();
        if(this.sensor && drawSensor){
            this.sensor.draw(roadCtx);
        }
        
    }

    // returns an array of points that make up the car's polygon
    getPolygon() {
        let points = [];
        const w2 = this.width / 2; // half width
        const l2 = this.length / 2; // half length
        
        if (this.direction) { // if the car is rotated
            const sinA = Math.sin(this.direction);
            const cosA = Math.cos(this.direction);
            const longxOffset = l2 * sinA;
            const longyOffset = l2 * cosA;
            const shortxOffset = w2 * cosA;
            const shortyOffset = w2 * sinA;

            points = [
                {x: this.x + longxOffset - shortxOffset, y: this.y - longyOffset - shortyOffset},
                {x: this.x + longxOffset + shortxOffset, y: this.y - longyOffset + shortyOffset},
                {x: this.x - longxOffset + shortxOffset, y: this.y + longyOffset + shortyOffset},
                {x: this.x - longxOffset - shortxOffset, y: this.y + longyOffset - shortyOffset}
            ];
           
        } else {
            points = [
                {x: this.x - w2, y: this.y - l2},
                {x: this.x + w2, y: this.y - l2},
                {x: this.x + w2, y: this.y + l2},
                {x: this.x - w2, y: this.y + l2}
            ];
            
        }

        return points;
    }
    
}