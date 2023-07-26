class Player{
    constructor(){
        this.clickedChecker = null;
    }

    async click() {
        // Returns a promise that resolves when a valid checker is clicked.
        return new Promise((resolve, reject) => {
            const checkers = document.getElementsByClassName('highlighted-checker');
            for (let i = 0; i < checkers.length; i++) {
                checkers[i].addEventListener('click', (e) => {
                    this.clickedChecker = e.target;
                    resolve();
                });
            }
        });
    }

    
    
}