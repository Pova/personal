const board_margin = 75;
const board_inner_side_margin = 100;
const board_inner_horizontal_space = 100;
triangle

function setup(){
    adjustCanvasSize();

    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    background(0);

    const board_width = width-2*board_margin;
    const board_height = height-2*board_margin;

    const triangle_height = (board_height-board_inner_horizontal_space)/2;
    const triangle_width = (board_width-2*board_inner_side_margin-10)/12;

    push();
    fill('#5B270B');
    stroke(255);
    strokeWeight(5);
    rect(board_margin,board_margin,board_width,board_height);
    pop();
    
    push();
    noStroke();
    rect(board_margin+board_width/2-5,board_margin,10,board_height);
    pop();

    stroke(255);
    line(board_margin + board_inner_side_margin, board_margin ,board_margin + board_inner_side_margin, board_margin+board_height);
    line(board_margin+board_width - board_inner_side_margin, board_margin ,board_margin+board_width - board_inner_side_margin, board_margin+board_height);

    // for (let k=0; k<2; k++){
    //     // k = top vs bottom
    //     for (let j=0; j<2; j++){
    //         // j = left vs right
    //         for (let i=0; i<6; i++){
    //             // i = position
    //         }
    //     }
    // }

    for (let i = 0; i<6; i++){
        stroke(0);
        if (i%2==0){
            fill(0);
        } else {
            fill(255);
        }
        triangle(
            board_margin+board_inner_side_margin+triangle_width*i,board_margin+2.5,
            board_margin+board_inner_side_margin+triangle_width+triangle_width*i,board_margin+2.5,
            board_margin+board_inner_side_margin+triangle_width/2+triangle_width*i,board_margin+triangle_height+2.5
            )
    }

    for (let i = 0; i<6; i++){
        stroke(0);
        if (i%2==0){
            fill(0);
        } else {
            fill(255);
        }
        triangle(
            board_margin+board_width/2-board_inner_side_margin+5+board_inner_side_margin+triangle_width*i,board_margin+2.5,
            board_margin+board_width/2-board_inner_side_margin+5+board_inner_side_margin+triangle_width+triangle_width*i,board_margin+2.5,
            board_margin+board_width/2-board_inner_side_margin+5+board_inner_side_margin+triangle_width/2+triangle_width*i,board_margin+triangle_height+2.5
            )
    }

    for (let i = 0; i<6; i++){
        stroke(0);
        if (i%2==1){
            fill(0);
        } else {
            fill(255);
        }
        triangle(
            board_margin+board_inner_side_margin+triangle_width*i,board_margin+board_height-2.5,
            board_margin+board_inner_side_margin+triangle_width+triangle_width*i,board_margin+board_height-2.5,
            board_margin+board_inner_side_margin+triangle_width/2+triangle_width*i,board_margin+board_height-triangle_height-2.5
            )
    }

    for (let i = 0; i<6; i++){
        stroke(0);
        if (i%2==1){
            fill(0);
        } else {
            fill(255);
        }
        triangle(
            board_margin+board_width/2-board_inner_side_margin+5+board_inner_side_margin+triangle_width*i,board_margin+board_height-2.5,
            board_margin+board_width/2-board_inner_side_margin+5+board_inner_side_margin+triangle_width+triangle_width*i,board_margin+board_height-2.5,
            board_margin+board_width/2-board_inner_side_margin+5+board_inner_side_margin+triangle_width/2+triangle_width*i,board_margin+board_height-triangle_height-2.5
            )
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