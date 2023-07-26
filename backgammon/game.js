const DICE_SIDES = 6;

let playerColour, opponentColour;

class Game{
    constructor(){
        this.game_started = false;
        this.current_player = null;
        this.current_rolls = [];
        this.gameOver = false;
        this.counter = 0;
    }

    async start_game(){
        // step 1 - set up initial rolls to determine game order
        document.getElementById('startButton').classList.add('disabled');
        
        // Await the player's decision
        playerColour = await this.ask_player_color();
        if (playerColour == 'White'){
            opponentColour = 'Black';
        } else {
            opponentColour = 'White';
        }

        // Then, start the initial rolls
        await game_log.add_lines('Game Started!');
        backgroundMusic.play();
        // Show the "End turn" and "Undo moves" buttons
        document.getElementById('endTurnButton').classList.remove('hidden');
        document.getElementById('undoMovesButton').classList.remove('hidden');
        await sleep(1000);
        await game_log.add_lines('Players will roll to determine starting order');
        this.initial_rolls(playerColour);
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

    async initial_rolls(playerColour) {
        const player_roll = await this.roll_dice(1);
        await game_log.add_lines('You roll: '+ player_roll); 
        await sleep(1000);
        const opponent_roll = await this.roll_dice(1);
        await game_log.add_lines('Your opponent rolls: '+ opponent_roll);
        if (player_roll > opponent_roll) {
            this.current_player = playerColour;
            await game_log.add_lines(`You (${playerColour}) rolled higher`);
            await game_log.add_lines('You will start the game!')
            this.current_rolls = [player_roll,opponent_roll];
            this.game_started = true;
            this.mainGameLoop();
        } else if (opponent_roll > player_roll){
            this.current_player = opponentColour;
            await game_log.add_lines(`Your opponent (${opponentColour}) rolled higher`);
            await game_log.add_lines('Your opponent will start the game!')
            this.current_rolls = [player_roll,opponent_roll];
            this.game_started = true;
            this.mainGameLoop();
        } else {
            await game_log.add_lines('Equal rolls: reroll needed!');
            this.initial_rolls(playerColour);
        }
    }

    getPotentialMoves() {
        // Code to get a list of potential moves for the current player
    }

    tempMovePiece(piece, newLocation) {
        // Code to temporarily move a piece
    }

    finalizeTurn() {
        // Code to finalize the current turn, make temporary moves permanent, 
        // and switch the current player
    }

    undoMoves() {
        // Code to undo all temporary moves
    }
    
    async mainGameLoop() {
        // Show new buttons once main game is triggerered
        document.getElementById('endTurnButton').classList.remove('disabled');
        document.getElementById('undoMovesButton').classList.remove('disabled');
        
        while (!this.gameOver && this.counter<100) {
            this.counter++
            // Code to control the main flow of the game, calling the functions
            // above as needed. 

            // Since some of your functions are asynchronous (like roll_dice), 
            // this function will also need to be asynchronous, and you'll
            // need to use "await" when calling those functions.
            await sleep(10);
            game_board.highlight_movable();
            await player.click();
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