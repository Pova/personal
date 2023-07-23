const DICE_SIDES = 6;

let playerColor, opponentColor;

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
            
            // Await the player's decision
            playerColor = await this.ask_player_color();
            if (playerColor == 'White'){
                opponentColor = 'Black';
            } else {
                opponentColor = 'White';
            }

            // Then, start the initial rolls
            backgroundMusic.play();
            await sleep(1000);
            await game_log.add_lines('Players will roll to determine starting order');
            this.initial_rolls(playerColor);
        } else {
            await game_log.add_lines('Game has already began');
        }
        // step 1 - initial rolls to determine game order
    }

    async ask_player_color() {
        // Show the modal
        document.getElementById('myModal').style.display = "block";

        // Return a promise that will be resolved with the selected color
        return new Promise((resolve, reject) => {
            // Wait for the player to select a color
            document.getElementById('whitePlayerButton').onclick = () => {
                resolve('White');
                document.getElementById('myModal').style.display = "none";
            };
            document.getElementById('blackPlayerButton').onclick = () => {
                resolve('Black');
                document.getElementById('myModal').style.display = "none";
            };
        });
    }


    async initial_rolls(playerColor) {
        const player_roll = await this.roll_dice(1);
        await game_log.add_lines('You roll: '+ player_roll); 
        await sleep(1000);
        const opponent_roll = await this.roll_dice(1);
        await game_log.add_lines('Your opponent rolls: '+ opponent_roll);
        if (player_roll > opponent_roll) {
            this.current_player = playerColor;
            await game_log.add_lines('You rolled higher (and will start the game)');
        } else if (opponent_roll > player_roll){
            this.current_player = opponentColor;
            await game_log.add_lines('Your opponent rolled higher (and will start the game)');
        } else {
            await game_log.add_lines('Equal rolls: reroll needed!');
            this.initial_rolls(playerColor);
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