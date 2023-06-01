import Pair from './pair.js';
import { createTable } from './index.js';
import { openGameOverModal } from "./modal.js";


class Game {
    constructor () {
        this.playAgainButton = document.getElementById('play-again');
        this.instructions = document.getElementById('instructions');
        this.gameScreen = document.getElementById('game-screen');
        this.gameOverScreen = document.getElementById('game-over');
        this.canvas = document.getElementById('view-canvas');
        this.pointCount = document.getElementsByClassName('point-count');
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true }); //this is added due to console error to improve performance
        this.pokemons = [];
        this.pairs = [];
        this.countdownVal = 20;
        this.points = 0;
        this.updateTable = this.updateTable.bind(this); 
    }

    start () {
        clearInterval(this.countdownInterval); //clears all previous countdowns
        
        this.gameScreen.style.display = 'block'; // Hides the instructions and shows game screen
        
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

        this.pointCount.innerText = `Your score: ${this.points}`; //update points 

    }

    animate() { //function allows multiple images on the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    

        this.pairs.forEach((pair, index) => {
            if (index !== this.hiddenPairIndex) {

                pair.draw();
            }
        });

        //Put total points and countdown onto canvas
        this.ctx.font = '14px sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Time left: ${this.countdownVal}`, 150, 15);
        this.ctx.fillText(`Points: ${this.points}`, 0, 15);

        requestAnimationFrame(() => this.animate());
    }

    revealPair(index) { //grabs the index of the pairs array and reveals it
        this.pairs[index].reveal();

        if (this.isRoundWon() && this.points <= 4) {
            this.points += 1;

            for (let i = 0; i < this.pointCount.length; i++) {
                this.pointCount[i].innerText = `Points: ${this.points}`;
            } 

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
            if (this.points <= 4) {
                setTimeout(() => {
                    this.start(); // Start a new game after every round
                    this.updateTable();
                }, 700);
            }
        }

        if (!this.isRoundWon()) {
            for (let i = 0; i < this.pointCount.length; i++) {
                this.pointCount[i].innerText = `Points: ${this.points}`;
            }
          }

    }

    isRoundWon() {  //changed this so the array does not have all silhouettes in the array to trigger true/false but only for silhouettes floating on canvas
        const activePairs = this.pairs.filter((pair, index) => index !== this.hiddenPairIndex);  
        const roundWon = activePairs.every(pair => pair.actual.isRevealed);

        return roundWon;
    }

    gameOver () {
        clearInterval(this.countdownInterval) //clears the interval regardless if win/lose
        this.gameScreen.style.display = 'none';
      
        if (!this.isRoundWon()) {
            for (let i = 0; i < this.pointCount.length; i++) {
                this.pointCount[i].innerText = `Points: ${this.points}`;
            }
        }
        if (this.countdownVal <= 0) {
            openGameOverModal('Game Over!', `You did not match all the correct Pokemon shadows within the time limit. Better luck next time! Your final score is ${this.points}!`)
        }

    }

    startCountdown() {
        this.countdownVal = 10;
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