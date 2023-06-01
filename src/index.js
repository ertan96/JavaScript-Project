import Game from "./game.js"
import { openVictoryModal, openGameOverModal, closeModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('start-button');
    const victoryplayAgainButton = document.getElementById('v-play-again');
    const gameOverplayAgainButton = document.getElementById('go-play-again');

    let game = new Game();



    startButton.addEventListener('click', () => {
        game.start();
        createTable(game);
        closeModal();
    });

    victoryplayAgainButton.addEventListener('click', () => {
        game.points = 0;
        game.start();
        createTable(game);
        closeModal();
    });

    gameOverplayAgainButton.addEventListener('click', () => {
        game.points = 0;
        game.start();
        createTable(game);
        closeModal();
    });

});


function createTable(game) {
    const oldTable = document.querySelector('.container table');
    if (oldTable) {
        oldTable.remove();
    }

    const container = document.querySelector('.container');
    const table = document.createElement('table');
    const numPairs = game.pairs.length;
    for (let i = 0; i < 2; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 2; j++) {
            const cell = document.createElement('td');
            const imgButton = document.createElement('img');
            const index = i*2 + j;
            if (index < numPairs) {
                imgButton.src = game.pairs[index].actual.imagePath; // set the image source to the actual Pokemon image
                imgButton.dataset.pokemon = index; // Assign the index to the button
                imgButton.classList.add('pokemon-button'); // Add a class for styling
            }
            cell.appendChild(imgButton);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);

    // Adds 'click' for the buttons
    table.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const index = parseInt(e.target.dataset.pokemon);
            if (index === game.hiddenPairIndex) {
                // Player loses
                game.gameOver();
                //add current points to gameOverModal
                openGameOverModal('Game Over!', `You did not match all the correct SilhouetteMons in time. Better luck next time! Your final score is ${game.points}!`)
            } else {
                game.revealPair(index);
                if (game.points === 5) {
                    game.gameOver();
                    openVictoryModal('Victory!', 'You successfully beat the game!');
                }
            }
        }
    });
};

export { createTable };