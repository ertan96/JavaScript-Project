import Pair from './pair.js';

class Game {
    constructor () {
        this.canvas = document.getElementById('view-canvas');
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
        this.pokemons = [];
        this.pairs = [];
        
    }

    start () {
        const pair1 = new Pair('./src/pokemonImages/pikachu.png', this.canvas, this.ctx, 0.1);
        const pair2 = new Pair('./src/pokemonImages/emolga.png', this.canvas, this.ctx, 0.2);
        const pair3 = new Pair('./src/pokemonImages/squirtle.png', this.canvas, this.ctx, 0.3);
        const pair4 = new Pair('./src/pokemonImages/charmander.png', this.canvas, this.ctx, 0.3);
        this.pairs.push(pair1, pair2, pair3, pair4);

        this.hiddenPairIndex = Math.floor(Math.random() * this.pairs.length);

        this.animate();
    }

    animate() { //function allows multiple images on the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    

        this.pairs.forEach((pair, index) => {
            if (index !== this.hiddenPairIndex) {
                pair.draw();
            }
        });
    
        requestAnimationFrame(() => this.animate());
    }

    revealPair(index) { //grabs the index of the pairs array and reveals it
        this.pairs[index].actual.isRevealed = true;
        this.pairs[index].silhouette.isRevealed = false;
    }

    isGameOver() {  
        return this.pairs.every(pair => pair.actual.isRevealed);
    }

    async revealPair(index) { //allow for asynchronous drawing of silhouette and actual image
        await this.pairs[index].actual.reveal();
        this.pairs[index].actual.startAnimation();
    }


}

export default Game;