const starting_checkers = {
    1: [0,2],
    12: [0,5],
    17: [0,3],
    19: [0,5],
    6: [5,0],
    8: [3,0],
    13: [5,0],
    24: [2,0]
}

class Point {
    constructor(number) {
        this.number = number;
        this.q = Math.floor((this.number - 1) / 6);
        this.r = (this.number - 1) % 6;
        this.checkers = [0, 0]; // white, black
        this.add_checkers();
    }

    add_checkers() {
        if (this.number in starting_checkers) {
            this.checkers = starting_checkers[this.number];
        }
    }

    // Calculate x and y coordinate of the point
    get_coordinates() {
        let x, y;
        if (this.q < 2) {
            y = game_board.margin_v + game_board.height - game_board.inner_side_padding - 1;
        } else {
            y = game_board.margin_v + game_board.inner_side_padding + 1;
        }
        if (this.q == 1) {
            x = game_board.margin_h + game_board.inner_side_padding + game_board.triangle_width * (5 - this.r);
        } else if (this.q == 2) {
            x = game_board.margin_h + game_board.inner_side_padding + game_board.triangle_width * this.r;
        } else if (this.q == 0){
            x = game_board.margin_h + game_board.width / 2 - game_board.inner_side_padding + game_board.inner_middle_padding/2 + game_board.inner_side_padding + game_board.triangle_width * (5 - this.r);
        } else {
            x = game_board.margin_h + game_board.width / 2 - game_board.inner_side_padding + game_board.inner_middle_padding/2 + game_board.inner_side_padding + game_board.triangle_width * this.r;
        }
        return {x, y};
    }


    // Calculate the color of the triangle
    get_colour() {
        if ((this.number % 2 == 0 && this.q % 2 == 0) || (this.number % 2 == 1 && this.q % 2 == 1)) {
            return RED_HEX;
        } else {
            return CREAM_HEX;
        }
    }

    // Draw a checker on the point
    draw_checker(color, position) {
        const radius = game_board.triangle_width-5; // Define the appropriate radius
        const coords = this.get_coordinates();
        let offset = (position+.5) * radius; // Use the position to stack the checkers
        fill(color);
        if(this.q > 1){
            offset *= -1;
        }
        stroke(135);
        circle(coords.x + game_board.triangle_width / 2, coords.y - offset, radius);
    }

    // Draw checkers on the point
    draw_checkers() {
        for (let i = 0; i < this.checkers[0]; i++) {
            this.draw_checker('white', i); 
        }
        for (let i = 0; i < this.checkers[1]; i++) {
            this.draw_checker('black', i);
        }
    }

    highlight_checker(){
        const checker_count = max(this.checkers[0],this.checkers[1])
        this.draw_checker(AQUA_HEX,checker_count-1);
    }

    show_point() {
        noStroke();
        fill(this.get_colour());
        const coords = this.get_coordinates();
        if(this.q > 1){
            // top triangles
            triangle(
                coords.x, coords.y,
                coords.x + game_board.triangle_width, coords.y,
                coords.x + game_board.triangle_width / 2, coords.y + game_board.triangle_height
            );
        } else {
            // bottom triangles 
            triangle(
                coords.x, coords.y,
                coords.x + game_board.triangle_width, coords.y,
                coords.x + game_board.triangle_width / 2, coords.y - game_board.triangle_height
            );
        }

        this.draw_checkers();

        // Debugging info 

        // push();
        // fill(200,200,200);
        // text(this.number, coords.x, coords.y);
        // text(this.q, coords.x, coords.y+10);
        // text(this.r, coords.x, coords.y+20);
        // pop();

    }
}
