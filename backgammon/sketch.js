// Board constants
const board_margin_h = 400;
const board_margin_v = 75;
const board_inner_side_margin = 100;
const board_inner_horizontal_space = 100;


function setup(){
    adjustCanvasSize();

    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    game_board = new Board(
        board_margin_h,
        board_margin_v
        )
}

function draw(){
    background(0);
    game_board.show();
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