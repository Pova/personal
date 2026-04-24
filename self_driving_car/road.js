class Lane {
    constructor(sx, sy, height) {   // start and end points
        this.sx = sx;
        this.sy = sy;
        this.height = height;
        this.width = laneWidth;
        this.color = 'lightgrey';
        this.left = this.sx - (this.width / 2);
        this.right = this.sx + (this.width / 2);
    }
    
    draw() {
        roadCtx.fillStyle = this.color;
        roadCtx.fillRect(this.sx - this.width / 2, this.sy, this.width, this.height + 1);
    }   
    
}

class Road {
    constructor(sx, sy, height) {  // start and end x, y pos and angle
        this.sx = sx;
        this.sy = sy;
        this.height = height;
        this.width = laneWidth * laneCount;
        this.left = this.sx - (this.width / 2);
        this.right = this.sx + (this.width / 2);
        
        this.lanes = [];
        this.#createLanes();

        this.trees = [];
        this.#createTrees();

        this.traffic = [];
        this.#createTraffic();


        const topLeft = {x: this.left, y: this.sy};
        const bottomLeft = {x: this.left, y: this.sy + this.height};
        const topRight = {x: this.right, y: this.sy};
        const bottomRight = {x: this.right, y: this.sy + this.height};
        this.borders = [[topLeft, bottomLeft], [topRight, bottomRight]]
    }


    #createLanes() {
        for (let i = 0; i < laneCount; i++) {
            this.lanes.push( new Lane(
                    this.left + ( (i + 0.5) * laneWidth),
                    this.sy, 
                    this.height ));
        }
    }


    #createTrees(){
        for (let i = 0; i < Math.random() * 2; i++) {
            this.trees.push( 
                {
                    x: this.left - 50 - Math.random() * 50,
                    y: this.sy + i * this.height/3 + Math.random() * this.height/3 
                }
            )
        }
        for (let i = 0; i < Math.random() * 2; i++) {
            this.trees.push( 
                {
                    x: this.right + 50 + Math.random() * 50,
                    y: this.sy + i * this.height/3 + Math.random() * this.height/3 
                }
            )
        }
    }


    #createTraffic() {
        const gap = 2;
        
        // random array of lane numbers to fill with traffic
        let laneNums = [];
        for (let i = 0; i < laneCount; i++) {
            laneNums.push(i);
        }
        laneNums = shuffleArray(laneNums);
        laneNums.splice(0, gap)
        
        laneNums.forEach( laneNum => {
            const lane = this.lanes[laneNum];
            this.traffic.push(
                new Vehicle(
                    lane.sx,
                    lane.sy,
                    30,
                    50,
                )
            )
        })
    }


    update(){
        // update traffic
        this.traffic.forEach(vehicle => vehicle.update());
    }


    draw() {
        // draw lanes
        this.lanes.forEach(lane => lane.draw());

        // draw lane lines
        for (let i=0; i <= laneCount; i++) {
            roadCtx.strokeStyle = 'white';
            roadCtx.lineWidth = 3;
            
            // dashed for middle lane, solid for outer
            if (i == 0 || i == laneCount) {
                roadCtx.setLineDash([]);
            } else {
                roadCtx.setLineDash([20, 20]);
            }

            roadCtx.beginPath();
            roadCtx.moveTo(this.left + (i * laneWidth), this.sy);
            roadCtx.lineTo(this.left + (i * laneWidth), this.sy + this.height);
            roadCtx.stroke();
            roadCtx.closePath();
        }

        // draw borders 
        this.borders.forEach(border => {
            roadCtx.strokeStyle = 'black';
            roadCtx.lineWidth = this.borderWidth;
            roadCtx.beginPath();
            roadCtx.moveTo(border[0].x, border[0].y);
            roadCtx.lineTo(border[1].x, border[1].y);
            roadCtx.stroke();
            roadCtx.closePath();
        })
        
        // draw trees
        this.trees.forEach(tree => {
            roadCtx.fillStyle = 'brown';
            roadCtx.fillRect(tree.x, tree.y, 20, 40); 
            roadCtx.fillStyle = 'green';
            roadCtx.beginPath();
            roadCtx.arc(tree.x + 10, tree.y - 10, 30, 0, Math.PI * 2);
            roadCtx.fill();
            roadCtx.closePath();
        })
    }
}