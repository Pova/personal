const roadCanvas = document.getElementById('roadCanvas');
roadCanvas.height=window.innerHeight * 0.9;
roadCanvas.width=500;
const roadCtx = roadCanvas.getContext('2d');

const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.height=window.innerHeight * 0.7;
networkCanvas.width=500;
const networkCtx = networkCanvas.getContext('2d');

const centerx = roadCanvas.width/2;
const laneWidth = 40;
const laneCount = 5;
const controlType = 'AI';

// Generate multiple cars
const num = 100;
let cars = generateCars(num);
let bestCar = cars[0];

let path = new Path( centerx, 100, 400);
let traffic = new Traffic();
let play = true;

mouse = {}
roadCanvas.addEventListener('click', (e) => {
    cars = generateCars(num);
    bestCar = cars[0];
    path = new Path( centerx, 100, 400);
    traffic = new Traffic();
    play = true;
});

animate();

function generateCars(num){
    const cars = [];
    for (let i=1; i<=num; i++){
        cars.push(new Player(centerx, 200, 20, 40, controlType));
    }
    return cars
}

function animate(time){
    if (play) {
        roadCanvas.height = window.innerHeight * 0.9;  // used to clear canvas
        networkCanvas.height = window.innerHeight * 0.9;

        for (let i=0; i<cars.length; i++){
            cars[i].update(path,traffic);
        }
        bestCar = cars.find(
            c=>c.y==Math.min(
                ...cars.map(c=>c.y)
            ));

        path.update();
        traffic.update();
        
        roadCtx.translate(0, -bestCar.y + roadCanvas.height * 0.8);
        path.draw();    
        traffic.draw();

        roadCtx.globalAlpha=0.2;
        for (let i=0; i<cars.length; i++){
            cars[i].draw(roadCtx);
        }
        roadCtx.globalAlpha=1;
        bestCar.draw(roadCtx,true);

        networkCtx.lineDashOffset=-time/50;
        Visualizer.drawNetwork(networkCtx, bestCar.brain);
    }
    requestAnimationFrame(animate);
}