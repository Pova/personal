function Snake(pos_x, pos_y) { //Constructor

    this.x = pos_x;
    this.y = pos_y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    this.tail = []; 

    this.eat = function(pos) {
        if (this.x + scl === pos.x && this.y === pos.y && this.xspeed > 0) { //right
            this.total++;
            return true;
        } else if (this.x - scl === pos.x && this.y === pos.y && this.xspeed < 0) { //left
            this.total++;
            return true;
        } else if (this.y + scl === pos.y && this.x === pos.x && this.yspeed > 0) { //down
            this.total++;
            return true;
        } else if (this.y - scl === pos.y && this.x === pos.x && this.yspeed < 0) { //up
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.death = function() {
        if (this.tail.length > 0) {
            for (var i = 0; i < this.tail.length; i++) {
                var pos = this.tail[i];
                var d = dist(this.x, this.y, pos.x, pos.y);
                if (d < 1 && this.tail.length > 1) {
                    this.reset(); 
                }
            }
        }
    }

    this.update = function() {
        if (this.total === this.tail.length) { 
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1]; 
                //s[0] is the back of the snake
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
        //end of array becomes old position

        if (this.xspeed != 0 || this.yspeed != 0) { 
            if (this.xspeed === -1 && this.x === 0) { 
                this.reset();
            } else if (this.xspeed === 1 && this.x === (width_size - scl)) { 
                this.reset();
            } else {
                this.x = this.x + this.xspeed * scl;
            }
            if (this.yspeed === -1 && this.y === 0) { 
                this.reset();
            } else if (this.yspeed === 1 && this.y === (height_size - scl)) { 
                this.reset();
            } else {
                this.y = this.y + this.yspeed * scl;
            }
        } 
    } 

    this.check = function(pos_x, pos_y) {
        if (this.x === pos_x && this.y === pos_y) {
            return true;
        }
        if (this.tail.length > 0) {
            for (var i = 0; i < this.tail.length; i++) {
                if (this.tail[i].x === pos_x && this.tail[i].y === pos_y) {
                    return true;
                }
            }
        }
        let next_pos_x = this.x + this.xspeed * scl;
        let next_pos_y = this.y + this.yspeed * scl;
        if (next_pos_x === pos_x && next_pos_y === pos_y){
            return true;
        }
        return false
    }


    this.show = function() {
        push();
        colorMode(HSB);
        var hue = 0;
        var sat = 100;
        var bri = 78;

        for (var i = -1; i < this.tail.length; i++) {
            if (hue > 255){
                hue = hue-255;
            } else{
                hue = hue+5;
            }
            if (i === -1) {
                fill(hue, sat, bri);
                rect(this.x, this.y, scl, scl);
            } else {
                fill(hue, sat, bri);
                rect(this.tail[(this.tail.length - 1) - i].x, this.tail[(this.tail.length - 1) - i].y, scl, scl);
            }

        }

        pop();
    }

    this.reset = function() {
        if (this.total+1 > highScore) {
            highScore = this.total+1;
        }
        gameStarted = false;
        s = new Snake();
    }

}