class Controls{
    constructor(type){
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;
        
        switch(type){
            case 'npc':
                this.forward = true;
                break;
            case 'player':
                this.#addKeyListeners();
                break;
        }

    }

    // Private method key listeners for the controls
    #addKeyListeners(){
        document.onkeydown = (e) => {
            switch(true){
                case e.key == 'w' || e.key == 'ArrowUp':
                    this.forward = true;
                    break;
                case e.key == 's' || e.key == 'ArrowDown':
                    this.backward = true;
                    break;
                case e.key == 'a' || e.key == 'ArrowLeft':
                    this.left = true;
                    break;
                case e.key == 'd' || e.key == 'ArrowRight':
                    this.right = true;
                    break;
            }
        }
        document.onkeyup = (e) => {
            switch(true){
                case e.key == 'w' || e.key == 'ArrowUp':
                    this.forward = false;
                    break;
                case e.key == 's' || e.key == 'ArrowDown':
                    this.backward = false;
                    break;
                case e.key == 'a' || e.key == 'ArrowLeft':
                    this.left = false;
                    break;
                case e.key == 'd' || e.key == 'ArrowRight':
                    this.right = false;
                    break;
                
            }
        }

    }

}
