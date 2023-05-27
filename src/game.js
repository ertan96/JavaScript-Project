import Pokemon from './pokemon.js';

class Game {
    constructor () {
        this.canvas = document.getElementById('view-canvas');
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
        this.pokemons = [];
    }

    start () {
        const pikachu = new Pokemon('./src/pokemonImages/pikachu.png', this.canvas, this.ctx, 0.1);
        this.pokemons.push(pikachu);

        this.pokemons.forEach(pokemon => {
            pokemon.startAnimation();
        });
    }

}

export default Game;