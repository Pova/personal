let s;
let scl = 30; //Scale variable
let food;
let highScore;
let gameStarted = false;
let slider;
let speed;
let status;

function setup() {

    const totalHeight = window.innerHeight;
    const totalWidth = window.innerWidth;

    const navBarHeight = document.getElementById('navBar').clientHeight;
    const detailBarHeight = document.getElementById('detailBar').clientHeight;

    canvasHeight = totalHeight-navBarHeight-detailBarHeight;
    canvasWidth = totalWidth;

    rows = Math.floor(canvasHeight / scl) - 2;
    cols = Math.floor(totalWidth / scl) - 2;

    canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent("#canvasContainer");

    width_size = scl * cols; //width of grid
    height_size = scl * rows; //height of grid

    if (localStorage.getItem('highscore')===null){
        localStorage.setItem('highscore', 0);
    } 
    highscore = localStorage.getItem('highscore');
    highscore_elt = document.getElementById('highscore');
    currentscore_elt = document.getElementById('currentscore');
    highscore_elt.innerHTML = highscore.toString();

    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
}

function draw() {

    translate((canvasWidth-width_size)/2,(canvasHeight-height_size)/2);

    background(255); 
    stroke(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j <= rows; j++) {
            point(i * scl, j * scl);
            point((i + 1) * scl, j * scl);
            point(i * scl, (j + 1) * scl);
            point((i + 1) * scl, (j + 1) * scl);
        }
    }
    speed = 10;
    frameRate(speed);

    push();
    strokeWeight(2);
    stroke(0);
    line(0, 0, 0, height_size);
    line(0, height_size, width_size, height_size);
    line(width_size, height_size, width_size, 0);
    line(width_size, 0, 0, 0);
    pop();

    // Intro animation
    if (!gameStarted) {
        currentscore_elt.innerHTML = "0";
        if (millis() >= 1000) {
            push();
            fill('#6c757d');
            stroke(0);
            textSize(128);
            textAlign(CENTER);
            text('S', width_size / 2 - 200, height / 2);
            pop();
        }
        if (millis() >= 2000) {
            push();
            fill('#6c757d');
            stroke(0);
            textSize(128);
            textAlign(CENTER);
            text('N', width_size / 2 - 100, height / 2);
            pop();
        }
        if (millis() >= 3000) {
            push();
            fill('#6c757d');
            stroke(0);
            textSize(128);
            textAlign(CENTER);
            text('A', width_size / 2, height / 2);
            pop();
        }
        if (millis() >= 4000) {
            push();
            fill('#6c757d');
            stroke(0);
            textSize(128);
            textAlign(CENTER);
            text('K', width_size / 2 + 100, height / 2);
            pop();
        }
        if (millis() >= 5000) {
            push();
            fill('#6c757d');
            stroke(0);
            textSize(128);
            textAlign(CENTER);
            text('E', width_size / 2 + 200, height / 2);
            pop();
        }
        if (millis() >= 6000) {
            push();
            fill('#6c757d');
            stroke(0);
            textSize(20);
            textAlign(CENTER);
            text('Use WASD or arrow keys to control the snake', width_size / 2, height / 2 + 60);
            pop();
        }

        if (millis() >= 7000) {
            push();
            fill('#6c757d');
            stroke(0);
            textSize(20);
            textAlign(CENTER);
            text('Press a direction to get started', width_size / 2, height / 2 + 90);
            pop();
        }
    }

    highscore_elt.innerHTML = highscore.toString();

    if (gameStarted) {
        
        currentscore_elt.innerHTML = (s.total+1).toString();

        food.show();
        if (s.eat(food)) {
            let found_pos = false;
            while (found_pos === false) {
                let maybe_food = createVector((floor(random(0,cols)) * scl), (floor(random(0, rows)) * scl));
                if (!s.check(maybe_food.x, maybe_food.y)) {
                    food = new Food(maybe_food.x, maybe_food.y);
                    found_pos = true;
                }
            }
        }
        s.death();
        s.update();
        s.show();
    }

}


function keyPressed() {
    if (gameStarted) {
        if ((keyCode === UP_ARROW || keyCode==87) && s.yspeed != 1) {
            s.dir(0, -1);
        } else if ((keyCode === DOWN_ARROW || keyCode==83) && s.yspeed != -1) {
            s.dir(0, 1);
        } else if ((keyCode === RIGHT_ARROW || keyCode==68) && s.xspeed != -1) {
            s.dir(1, 0);
        } else if ((keyCode === LEFT_ARROW || keyCode==65) && s.xspeed != 1) {
            s.dir(-1, 0);
        }
    } else { //If game is not started
        if (keyCode === UP_ARROW || keyCode==87) {
            gameStarted = true;
            s = new Snake(floor(random(0, cols)) * scl, (rows-1) * scl);
            s.dir(0, -1);
            food = new Food(s.x, floor(random(0, rows-1)) * scl);
        } else if (keyCode === DOWN_ARROW || keyCode==83) {
            gameStarted = true;
            s = new Snake(floor(random(0, cols)) * scl, 0);
            s.dir(0, 1);
            food = new Food(s.x, floor(random(1, rows)) * scl);
        } else if (keyCode === RIGHT_ARROW || keyCode==68) {
            gameStarted = true;
            s = new Snake(0, floor(random(0, rows)) * scl);
            s.dir(1, 0);
            food = new Food(floor(random(1, cols)) * scl, s.y);
        } else if (keyCode === LEFT_ARROW || keyCode==65) {
            gameStarted = true;
            s = new Snake((cols-1)*scl, floor(random(0,rows)) * scl);
            s.dir(-1, 0);
            food = new Food(floor(random(0, cols-1)) * scl, s.y);
        }
    }
}

