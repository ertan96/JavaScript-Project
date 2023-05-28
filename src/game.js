import Pair from './pair.js';

class Game {
    constructor () {
        this.canvas = document.getElementById('view-canvas');
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
        this.pokemons = [];
        this.pairs = [];
        
    }

    start () {
        const pair = new Pair('./src/pokemonImages/pikachu.png', this.canvas, this.ctx, 0.1);
        this.pairs.push(pair);

        this.pairs.forEach(pair => {
            pair.draw();
        });
    }

    revealPair(index) { //grabs the index of the pairs array and reveals it
        this.pairs[index].reveal();
    }

    isGameOver() {
        return this.pairs.every(pair => pair.actual.isRevealed);
    }


}

export default Game;