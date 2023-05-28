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
        const pair1 = new Pair('./src/pokemonImages/pikachu.png', this.canvas, this.ctx, 0.1);
        const pair2 = new Pair('./src/pokemonImages/emolga.png', this.canvas, this.ctx, 0.2);
        this.pairs.push(pair1, pair2);

        this.animate();
    }

    animate() { //function allows multiple images on the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.pairs.forEach(pair => {
            pair.draw();
        });

        requestAnimationFrame(() => this.animate());
    }

    revealPair(index) { //grabs the index of the pairs array and reveals it
        this.pairs[index].reveal();
    }

    isGameOver() {
        return this.pairs.every(pair => pair.actual.isRevealed);
    }


}

export default Game;