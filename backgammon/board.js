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

        this.positions = [];
    }

    show(){
        push();
        fill('#5B270B'); //Brown
        stroke(255);
        strokeWeight(1);
        rect(this.margin_h,this.margin_v,this.width,this.height);
        pop();
        
        // Middle separation
        push();
        noStroke();
        fill(255);
        rect(this.margin_h+this.width/2-5,this.margin_v,10,this.height);
        pop();

        stroke(255);
        line(this.margin_h + this.inner_side_padding, this.margin_v ,this.margin_h + this.inner_side_padding, this.margin_v + this.height);
        line(this.margin_h + this.width - this.inner_side_padding, this.margin_v ,this.margin_h + this.width - this.inner_side_padding, this.margin_v + this.height);

        push();
        translate(1,0);
        for (let i = 0; i<6; i++){
            noStroke();
            if (i%2==0){
                fill(0);
            } else {
                fill(255);
            }
            triangle(
                this.margin_h + this.inner_side_padding + this.triangle_width*i, this.margin_v + .5,
                this.margin_h + this.inner_side_padding + this.triangle_width + this.triangle_width*i, this.margin_v + .5,
                this.margin_h + this.inner_side_padding + this.triangle_width/2 + this.triangle_width*i, this.margin_v + this.triangle_height + .5
                )
        }

        for (let i = 0; i<6; i++){
            noStroke();
            if (i%2==0){
                fill(0);
            } else {
                fill(255);
            }
            triangle(
                this.margin_h+this.width/2-this.inner_side_padding+5+this.inner_side_padding+this.triangle_width*i,this.margin_v+.5,
                this.margin_h+this.width/2-this.inner_side_padding+5+this.inner_side_padding+this.triangle_width+this.triangle_width*i,this.margin_v+.5,
                this.margin_h+this.width/2-this.inner_side_padding+5+this.inner_side_padding+this.triangle_width/2+this.triangle_width*i,this.margin_v+this.triangle_height+.5
                )
        }

        for (let i = 0; i<6; i++){
            noStroke();
            if (i%2==1){
                fill(0);
            } else {
                fill(255);
            }
            triangle(
                this.margin_h+this.inner_side_padding+this.triangle_width*i,this.margin_v+this.height-.5,
                this.margin_h+this.inner_side_padding+this.triangle_width+this.triangle_width*i,this.margin_v+this.height-.5,
                this.margin_h+this.inner_side_padding+this.triangle_width/2+this.triangle_width*i,this.margin_v+this.height-this.triangle_height-.5
                )
        }

        for (let i = 0; i<6; i++){
            noStroke();
            if (i%2==1){
                fill(0);
            } else {
                fill(255);
            }
            triangle(
                this.margin_h+this.width/2-this.inner_side_padding+5+this.inner_side_padding+this.triangle_width*i,this.margin_v+this.height-.5,
                this.margin_h+this.width/2-this.inner_side_padding+5+this.inner_side_padding+this.triangle_width+this.triangle_width*i,this.margin_v+this.height-.5,
                this.margin_h+this.width/2-this.inner_side_padding+5+this.inner_side_padding+this.triangle_width/2+this.triangle_width*i,this.margin_v+this.height-this.triangle_height-.5
                )
        }
        pop();
    }
}