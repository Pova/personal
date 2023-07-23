const DICE_SIDES = 6;

class Game{
    constructor(){
        this.game_started = false;
        this.current_player = null;
    }

    async start_game(){
        if (!this.game_started){
            this.game_started = true;

            document.getElementById('startButton').classList.add('disabled');

            await game_log.add_lines('Game Started!');
            backgroundMusic.play();
            await sleep(1000);
            

            this.initial_rolls();
        } else {
            await game_log.add_lines('Game has already began');
        }
        // step 1 - initial rolls to determine game order
    }

    async initial_rolls() {
        const white_roll = await this.roll_dice(1);
        await game_log.add_lines('White player rolls: '+ white_roll); 
        await sleep(1000);
        const black_roll = await this.roll_dice(1);
        await game_log.add_lines('Black player rolls: '+ black_roll);
        if (white_roll > black_roll) {
            this.current_player = 'White'
            await game_log.add_lines(this.current_player + ' player - Rolls higher and will start the game');
        } else if (black_roll > white_roll){
            this.current_player = 'Black'
            await game_log.add_lines(this.current_player + ' player - Rolls higher and will start the game');
        } else {
            await game_log.add_lines('No one rolls higher - Reroll');
        }
    }

    roll_single_die(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }
    
    /**
     * Simulates the rolling of two six-sided dice.
     *
     * @returns {Array} An array containing the results of the two dice rolls.
     */

    async roll_dice(diceCount, sides = DICE_SIDES) {
        rollSound.play();
        let rolls = [];
        for(let i = 0; i < diceCount; i++) {
            rolls.push(this.roll_single_die(sides));
        }
        await sleep(1500);
        return rolls;
    }
}