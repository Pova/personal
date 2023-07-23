class gameLog{
    constructor(){
        this.lines = ['Welcome to my backgammon!', 'Press Start Game to begin...'];
        this.lineHeight = 30;
        this.x = game_board.width + game_board.margin_h + 40;
    }

    print_lines() {

        let maxLines = Math.floor(canvasHeight / this.lineHeight) - 2;
        let start = Math.max(0, this.lines.length - maxLines);
        textSize(18);
        noStroke();

        push();
        fill(FUCHSIA_HEX);
        text('=~=~=~=~=', this.x, this.lineHeight + 10);
        text(' Game Log', this.x, 2*this.lineHeight-5);
        text('=~=~=~=~=', this.x, 3*this.lineHeight-20);
        pop();

        for (let i = this.lines.length - 1; i >= start; i--) {
            let y = (this.lines.length - 1 - i + 3) * this.lineHeight + 10;
            if(i == this.lines.length - 1) {
                fill(GREEN_TEXT_HEX); // Distinguish the newest text with color red
            } else {
                fill(255); // Older text in black
            }
            text(this.lines[i], this.x, y);
        }
    }

    async add_lines(text){
        await sleep(500);
        this.lines.push(text);
    }
}