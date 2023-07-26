class Board{

    constructor(
            board_width,
            board_height
        ){
        
        this.width = board_width;
        this.height = board_height;

        this.margin_h = (width - board_width)/2;
        this.margin_v = (height - board_height)/2;
        
        // Calculate other properties

        // Left and right side of the board
        this.inner_side_padding = this.width*inner_side_padding_const;
        // Middle of the board with the hinges
        this.inner_middle_padding = this.width*middle_separation_cost;
        // Space between triangle points
        this.inner_v_whitespace = this.height*inner_v_whitespace_const;

        // Point dimensions
        this.triangle_height = (this.height-this.inner_v_whitespace-this.inner_side_padding*2)/2;
        this.triangle_width = (this.width-2*this.inner_side_padding-this.inner_middle_padding)/12;

        this.points = []; // Array of 24 points (1 is bottom right, 12 bottom left, 13 top left, 24 top right)

        for (let i = 0; i<24; i++){
            this.points.push(new Point(i+1));
        }
    }

    show(){
        push();
        fill(BROWN_HEX); // Brown board colour
        stroke(255);
        strokeWeight(1);
        rect(this.margin_h,this.margin_v,this.width,this.height);
        pop();

        push();
        fill(GREEN_HEX); // Green play surface
        stroke(255);
        strokeWeight(1);
        rect(this.margin_h + this.inner_side_padding,this.margin_v + this.inner_side_padding,this.width-this.inner_side_padding*2,this.height - this.inner_side_padding*2);
        pop();
        
        // Middle separation
        push();
        noStroke();
        fill(BROWN_HEX);
        rect(this.margin_h+this.width/2-this.inner_middle_padding/2,this.margin_v+1,this.inner_middle_padding,this.height-2);
        stroke(255);
        line(this.margin_h+this.width/2-this.inner_side_padding/2,this.margin_v+this.inner_side_padding,this.margin_h+this.width/2-this.inner_side_padding/2,this.margin_v+this.height-this.inner_side_padding);
        line(this.margin_h+this.width/2+this.inner_side_padding/2,this.margin_v+this.inner_side_padding,this.margin_h+this.width/2+this.inner_side_padding/2,this.margin_v+this.height-this.inner_side_padding);
        // Hinges
        fill(GOLD_HEX);
        stroke(0);
        rect(this.margin_h+this.width/2-5,this.margin_v+this.height*0.15,10,this.height*0.05);
        rect(this.margin_h+this.width/2-5,this.margin_v+this.height*0.8,10,this.height*0.05);
        // Central crease
        strokeWeight(2);
        stroke(0);
        line(this.margin_h+this.width/2,this.margin_v+2,this.margin_h+this.width/2,this.margin_v+this.height-2);
        pop();

        // Left and right lines
        stroke(255);
        line(this.margin_h + this.inner_side_padding,this.margin_v + this.inner_side_padding,
             this.margin_h + this.inner_side_padding,this.margin_v - this.inner_side_padding + this.height
             );
        line(this.margin_h + this.width - this.inner_side_padding,this.margin_v + this.inner_side_padding,
            this.margin_h + this.width - this.inner_side_padding,this.margin_v - this.inner_side_padding + this.height
            );

        // draw points
        for (let i = 0; i<24; i++){
            this.points[i].show_point();
        }
    }

    highlight_movable(){
        const indices_to_highlight = findNonZeroCheckerIndices(game.current_player);
        indices_to_highlight.forEach((index) => {
            game_board.points[index].highlight_checker();
          });
    }

}