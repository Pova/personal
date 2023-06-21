const boid_length = 10; //length in pixels
const boid_width = 6; //width in pixels

const perception = 50;

const flock = [];
const flock_size = 100;

function setup() {
    adjustCanvasSize();
    
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    for (let i=0;i<flock_size; i++){
        flock.push(new Boid());
    }
  }

  function draw(){
    background(0);

    for (let boid of flock){
        boid.flock_calculation(flock);
        boid.update();
        boid.edges()
        boid.show();
    }
  }

// Sets the canvas size based on the window size
function adjustCanvasSize() {
    const totalHeight = window.innerHeight;
    const totalWidth = window.innerWidth;
  
    const navBarHeight = document.getElementById('navBar').clientHeight;
    const detailBarHeight = document.getElementById('detailBar').clientHeight;
  
    canvasHeight = totalHeight - navBarHeight - detailBarHeight;
    canvasWidth = totalWidth;
  }