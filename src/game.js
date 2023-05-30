import Pair from './pair.js';

class Game {
    constructor () {
        this.canvas = document.getElementById('view-canvas');
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true }); //this is added due to console error to improve performance
        this.pokemons = [];
        this.pairs = [];
        
    }

    start () {
        const allPairs = [
            new Pair('./src/pokemonImages/pikachu.png', this.canvas, this.ctx, 0.1),
            new Pair('./src/pokemonImages/emolga.png', this.canvas, this.ctx, 0.2),
            new Pair('./src/pokemonImages/bulbasaur.png', this.canvas, this.ctx, 0.3),
            new Pair('./src/pokemonImages/ivysaur.png', this.canvas, this.ctx, 0.3),
            new Pair('./src/pokemonImages/venusaur.png', this.canvas, this.ctx, 0.3),
            new Pair('./src/pokemonImages/charmander.png', this.canvas, this.ctx, 0.3),
            new Pair('./src/pokemonImages/charmeleon.png', this.canvas, this.ctx, 0.3),
            new Pair('./src/pokemonImages/charizard.png', this.canvas, this.ctx, 0.3),
            new Pair('./src/pokemonImages/squirtle.png', this.canvas, this.ctx, 0.3),
            new Pair('./src/pokemonImages/wartortle.png', this.canvas, this.ctx, 0.3),
            new Pair('./src/pokemonImages/blastoise.png', this.canvas, this.ctx, 0.3)
        ]

        const pairObj = {
            pikachu: new Pair('./src/pokemonImages/pikachu.png', this.canvas, this.ctx, 0.1),
            emnolga: new Pair('./src/pokemonImages/emolga.png', this.canvas, this.ctx, 0.2),
            bulbasaur: new Pair('./src/pokemonImages/bulbasaur.png', this.canvas, this.ctx, 0.3),
            ivysaur: new Pair('./src/pokemonImages/ivysaur.png', this.canvas, this.ctx, 0.3),
            venusaur: new Pair('./src/pokemonImages/venusaur.png', this.canvas, this.ctx, 0.3),
            charmander: new Pair('./src/pokemonImages/charmander.png', this.canvas, this.ctx, 0.3),
            charmeleon: new Pair('./src/pokemonImages/charmeleon.png', this.canvas, this.ctx, 0.3),
            charizard: new Pair('./src/pokemonImages/charizard.png', this.canvas, this.ctx, 0.3),
            squritle: new Pair('./src/pokemonImages/squirtle.png', this.canvas, this.ctx, 0.3),
            wartortle: new Pair('./src/pokemonImages/wartortle.png', this.canvas, this.ctx, 0.3),
            blastoise: new Pair('./src/pokemonImages/blastoise.png', this.canvas, this.ctx, 0.3)
        };
        
        for (let i = 0; i < 4; i++) { // pushes 4  
            const randomIndex = Math.floor(Math.random() * allPairs.length);
            const selectedPair = allPairs.splice(randomIndex, 1)[0]; // Removes the selected pair from allPairs array
            this.pairs.push(selectedPair);
        }

        this.hiddenPairIndex = Math.floor(Math.random() * this.pairs.length); // the hidden pair is the one displayed on the table and at a random position
        window.pairs = this.pairs;
        
        this.animate();
    }

    

    animate() { //function allows multiple images on the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    

        this.pairs.forEach((pair, index) => {
            if (index !== this.hiddenPairIndex) {
                // debugger
                pair.draw();
            }
        });
    
        requestAnimationFrame(() => this.animate());
    }

    revealPair(index) { //grabs the index of the pairs array and reveals it
        console.log(`Revealing pair at index ${index}`);
        // this.pairs[index].actual.reveal();
        this.pairs[index].reveal();
        console.log(`Pair revealed: ${this.pairs[index].actual.isRevealed}`);
    }

    isGameWon() {  //changed this so the array does not have all silhouettes in the array to trigger true/false but only for silhouettes floating on canvas
        const activePairs = this.pairs.filter((pair, index) => index !== this.hiddenPairIndex);  
        return activePairs.every(pair => pair.actual.isRevealed);
    }


}

export default Game;