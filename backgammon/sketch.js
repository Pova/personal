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
const GREEN_TEXT_HEX = '#90EE90';
const FUCHSIA_HEX = '#FF77FF';
const AQUA_HEX = '#40E0D0';

const rollSound = new Audio('sounds/dice-142528.mp3');
let isMusicMuted = false;
const backgroundMusic = new Audio('sounds/background_music.mp3');

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

    game = new Game();
    player = new Player();
    game_log = new gameLog();
}

function draw(){
    background(0);
    game_board.show();
    game_log.print_lines();
    frameRate(10);
    text(`fr = ${Math.floor(frameRate())}`,20,20);
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

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function toggleMusic() {
    isMusicMuted = !isMusicMuted;
    if (isMusicMuted) {
        backgroundMusic.pause();
        document.getElementById('musicToggle').classList.add('btn-muted');
        document.getElementById('musicIcon').classList.remove('fa-volume-up');
        document.getElementById('musicIcon').classList.add('fa-volume-mute');
    } else {
        if (game.game_started){
            backgroundMusic.play();
        }
        document.getElementById('musicToggle').classList.remove('btn-muted');
        document.getElementById('musicIcon').classList.remove('fa-volume-mute');
        document.getElementById('musicIcon').classList.add('fa-volume-up');
    }
  }

  function findNonZeroCheckerIndices(playerColour) {
    const checkerIndex = playerColour === 'White' ? 0 : 1;
    return game_board.points
        .map((point, index) => ({index: index, checkers: point.checkers[checkerIndex]}))
        .filter(point => point.checkers > 0)
        .map(point => point.index) 
}