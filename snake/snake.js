class Snake { //Constructor
    constructor(pos_x, pos_y){
        this.x = pos_x;
        this.y = pos_y;
        this.xspeed = 0;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
    }
     
    eat(pos) {
        if (this.x + scl === pos.x && this.y === pos.y && this.xspeed > 0) { //right
            this.total++;
            blipSound.play()
            return true;
        } else if (this.x - scl === pos.x && this.y === pos.y && this.xspeed < 0) { //left
            this.total++;
            blipSound.play()
            return true;
        } else if (this.y + scl === pos.y && this.x === pos.x && this.yspeed > 0) { //down
            this.total++;
            blipSound.play()
            return true;
        } else if (this.y - scl === pos.y && this.x === pos.x && this.yspeed < 0) { //up
            this.total++;
            blipSound.play()
            return true;
        } else {
            return false;
        }
    }

    dir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    async death() {
        if (this.tail.length > 0) {
            for (let i = 0; i < this.tail.length; i++) {
                let pos = this.tail[i];
                let d = dist(this.x, this.y, pos.x, pos.y);
                if (d < 1 && this.tail.length > 1) {
                    loseMusic.play();
                    gameOver = true;
                    this.reset(); 
                }
            }
        }
    }

    update() {
        if (this.total === this.tail.length) { 
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1]; 
                //s[0] is the back of the snake
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
        //end of array becomes old position

        if (this.xspeed != 0 || this.yspeed != 0) { 
            if (this.xspeed === -1 && this.x === 0) {
                loseMusic.play();
                gameOver = true; 
                this.reset();
            } else if (this.xspeed === 1 && this.x === (width_size - scl)) {
                loseMusic.play();
                gameOver = true; 
                this.reset();
            } else {
                this.x = this.x + this.xspeed * scl;
            }
            if (this.yspeed === -1 && this.y === 0) {
                loseMusic.play();
                gameOver = true; 
                this.reset();
            } else if (this.yspeed === 1 && this.y === (height_size - scl)) {
                loseMusic.play();
                gameOver = true; 
                this.reset();
            } else {
                this.y = this.y + this.yspeed * scl;
            }
        } 
    } 

    check(pos_x, pos_y) {
        if (this.x === pos_x && this.y === pos_y) {
            return true;
        }
        if (this.tail.length > 0) {
            for (let i = 0; i < this.tail.length; i++) {
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


    show() {
        push();
        colorMode(HSB);
        let hue = -2.55;
        let sat = 100;
        let bri = 78;

        for (let i = -1; i < this.tail.length; i++) {
            if (hue > 255){
                hue = hue-255;
            } else{
                hue = hue+2.55;
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

    reset() {
        if (this.total+1 > highscore) {
            highscore = this.total+1;
            localStorage.setItem('highscore', highscore);
        }
        gameStarted = false;
        s = new Snake();
    }

}