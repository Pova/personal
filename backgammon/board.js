class Board{

    constructor(
            board_margin_h,
            board_margin_v
        ){
        this.margin_h = board_margin_h;
        this.margin_v = board_margin_v;
        
        // Calculate other properties

        this.width = width-2*this.margin_h;
        this.height = height-2*this.margin_v;

        this.inner_side_padding = this.width*0.08
        this.inner_v_whitespace = this.height*0.15

        this.triangle_height = (this.height-this.inner_v_whitespace)/2;
        this.triangle_width = (this.width-2*this.inner_side_padding-14)/12;

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
        fill(GREEN_HEX); // Brown board colour
        stroke(255);
        strokeWeight(1);
        rect(this.margin_h + this.inner_side_padding,this.margin_v,this.width-this.inner_side_padding*2,this.height);
        pop();
        
        // Middle separation
        push();
        noStroke();
        fill(255);
        rect(this.margin_h+this.width/2-5,this.margin_v,10,this.height);
        pop();

        // Left and right lines
        stroke(255);
        line(this.margin_h + this.inner_side_padding,this.margin_v,
             this.margin_h + this.inner_side_padding,this.margin_v + this.height
             );
        line(this.margin_h + this.width - this.inner_side_padding,this.margin_v,
            this.margin_h + this.width - this.inner_side_padding,this.margin_v + this.height
            );

        // draw points
        for (let i = 0; i<24; i++){
            this.points[i].show_point();
        }
    }
}