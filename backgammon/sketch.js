// Board constants
// const board_width = 600;
// const board_height = 600;

const inner_side_padding_const = 0.05;
const inner_v_whitespace_const = 0.15;
const middle_separation_cost = 0.05;

// Board colours
const GREEN_HEX = '#164623';
const BROWN_HEX = '#5B270B';
const CREAM_HEX = '#FEFBEA';
const RED_HEX = '#CA3433';
const GOLD_HEX = '#D1B000';



function setup(){
    adjustCanvasSize();

    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    const board_width = canvasHeight*0.95;
    const board_height = board_width;

    game_board = new Board(
        board_width,
        board_height
        )
}

function draw(){
    background(0);
    game_board.show();
    noLoop();
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