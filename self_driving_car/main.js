const roadCanvas = document.getElementById('roadCanvas');
const networkCanvas = document.getElementById('networkCanvas');

roadCanvas.width = 500;
networkCanvas.width = 500;

// Height of the two canvases: sized against the available viewport space
// below the navbar + detail bar so the simulation fits on screen without
// forcing the page to scroll.
function availableStageHeight() {
    const navBar    = document.getElementById('navBar');
    const detailBar = document.getElementById('detailBar');
    const used = (navBar ? navBar.offsetHeight : 0)
               + (detailBar ? detailBar.offsetHeight : 0);
    // Small extra padding so the canvases don't kiss the edges.
    const padding = 64;
    return Math.max(400, window.innerHeight - used - padding);
}

let stageHeight = availableStageHeight();
roadCanvas.height    = stageHeight;
networkCanvas.height = stageHeight;

window.addEventListener('resize', () => {
    stageHeight = availableStageHeight();
    // Don't resize during a running frame - animate() resets height every
    // tick anyway, so the next frame will pick up the new value.
});

const roadCtx    = roadCanvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');

const centerx = roadCanvas.width / 2;
const laneWidth = 40;
const laneCount = 5;
const controlType = 'AI';

const num = 100;
let cars = generateCars(num);
let bestCar = cars[0];

let path = new Path(centerx, 100, 400);
let traffic = new Traffic();
let play = true;

mouse = {};

function reset() {
    cars = generateCars(num);
    bestCar = cars[0];
    path = new Path(centerx, 100, 400);
    traffic = new Traffic();
    play = true;
}

roadCanvas.addEventListener('click', reset);

const resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
    resetBtn.addEventListener('click', reset);
}

animate();

function generateCars(num) {
    const cars = [];
    for (let i = 1; i <= num; i++) {
        cars.push(new Player(centerx, 200, 20, 40, controlType));
    }
    return cars;
}

function animate(time) {
    if (play) {
        // Reassigning height also clears the canvas for the next frame.
        roadCanvas.height = stageHeight;
        networkCanvas.height = stageHeight;

        for (let i = 0; i < cars.length; i++) {
            cars[i].update(path, traffic);
        }
        bestCar = cars.find(
            c => c.y == Math.min(
                ...cars.map(c => c.y)
            ));

        path.update();
        traffic.update();

        roadCtx.translate(0, -bestCar.y + roadCanvas.height * 0.8);
        path.draw();
        traffic.draw();

        roadCtx.globalAlpha = 0.2;
        for (let i = 0; i < cars.length; i++) {
            cars[i].draw(roadCtx);
        }
        roadCtx.globalAlpha = 1;
        bestCar.draw(roadCtx, true);

        networkCtx.lineDashOffset = -time / 50;
        Visualizer.drawNetwork(networkCtx, bestCar.brain);
    }
    requestAnimationFrame(animate);
}
