class NeuralNetwork{
    constructor(neuronCounts){
        this.levels = [];

        for (let i=0; i<neuronCounts.length-1; i++){
            this.levels.push(new Level(
                neuronCounts[i],neuronCounts[i+1]
            ));
        }
    }

    static feedForward(givenInputs, network){
        
        // feedForward on input layer
        let outputs = Level.feedForward(
            givenInputs,network.levels[0]
        );

        // feedForward on rest of layers
        for (let i=1; i<network.levels.length; i++){
            outputs = Level.feedForward(
                outputs, network.levels[i]
            );
        }

        // outputs[0] == Forward
        // outputs[1] == Right
        // outputs[2] == Backward
        // outputs[3] == Left

        return outputs;
    }
}

class Level{
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for(let i=0; i<inputCount; i++){
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level){
        for(let i=0; i<level.inputs.length; i++){
            for (let j=0; j<level.outputs.length; j++){
                level.weights[i][j] = Math.random()*2 - 1; //random value between -1 and 1
            }
        }

        for (let i=0; i<level.biases.length; i++){
            level.biases[i] = Math.random()*2-1;
        }
    }

    static feedForward(givenInputs, level){
        for (let i=0; i<level.inputs.length; i++){
            level.inputs[i] = givenInputs[i];
        }

        for (let i=0; i<level.outputs.length; i++){
            let sum = 0;
            for (let j=0; j<level.inputs.length; j++){ //look for way to vectorize operation in js?
                sum += level.inputs[j]*level.weights[j][i];
            }

            // Could use sigmoid function here instead
            if (sum > level.biases[i]){
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }
}