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
        board_margin_v,
        board_inner_side_margin,
        board_inner_horizontal_space)

    // const board_width = width-2*board_margin_h;
    // const board_height = height-2*board_margin_v;

    // const triangle_height = (board_height-board_inner_horizontal_space)/2;
    // const triangle_width = (board_width-2*board_inner_side_margin-10)/12;
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