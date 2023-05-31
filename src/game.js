import Pair from './pair.js';
import { createTable } from './index.js';

class Game {
    constructor () {
        this.playAgainButton = document.getElementById('play-again');
        this.instructions = document.getElementById('instructions');
        this.gameScreen = document.getElementById('game-screen');
        this.gameOverScreen = document.getElementById('game-over');
        this.canvas = document.getElementById('view-canvas');
        this.pointCount = document.getElementById('point-count');
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true }); //this is added due to console error to improve performance
        this.pokemons = [];
        this.pairs = [];
        this.countdownVal = 20;
        this.points = 0;
        this.updateTable = this.updateTable.bind(this);
        
    }

    start () {
        clearInterval(this.countdownInterval); //clears all previous countdowns
        
        // Hides the instructions and shows game screen
        this.instructions.style.display = 'none';
        this.gameScreen.style.display = 'block';
        
        this.pairs = [];

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
        
        for (let i = 0; i < 4; i++) { // pushes 4  
            const randomIndex = Math.floor(Math.random() * allPairs.length);
            const selectedPair = allPairs.splice(randomIndex, 1)[0]; // Removes the selected pair from allPairs array
            this.pairs.push(selectedPair);
        }

        this.hiddenPairIndex = Math.floor(Math.random() * this.pairs.length); // the hidden pair is the one displayed on the table and at a random position
        window.pairs = this.pairs;
        
        this.animate();
        this.updateTable();
        this.startCountdown();
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
        this.pairs[index].reveal();

        if (this.isGameWon()) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
            setTimeout(() => {
                this.start(); // Start a new game
                this.updateTable();
            }, 1000);
        }
    }

    isGameWon() {  //changed this so the array does not have all silhouettes in the array to trigger true/false but only for silhouettes floating on canvas
        const activePairs = this.pairs.filter((pair, index) => index !== this.hiddenPairIndex);  
        const roundWon = activePairs.every(pair => pair.actual.isRevealed);

        if (roundWon) {
            this.points += 1; //increment points by 1
            this.pointCount.innerText = `Points: ${this.points}`; //update points in html
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
            this.updateTable();

    
        }

        return roundWon;
    }

    gameOver () {
        clearInterval(this.countdownInterval) //clears the interval regardless if win/lose
        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'block';
        this.playAgainButton.style.display = 'block';

        if (this.isGameWon()) {
            console.log('game.js Winner');
        } else {
            this.pointCount.innerText = `Points: ${this.points}`;
            console.log('game.js Loser');
        }

    }

    startCountdown() {
        this.countdownVal = 20;
        const countdownEle = document.getElementById('countdown');
        countdownEle.innerText = this.countdownVal;
        
        this.countdownInterval = setInterval(() => {
            this.countdownVal -= 1;
            countdownEle.innerText = this.countdownVal;
            
            if (this.countdownVal <= 0) {
                clearInterval(this.countdownInterval);
                this.gameOver();
            }
        }, 1000); 
    }

    updateTable() {
        createTable(this);
    }

}

export default Game;