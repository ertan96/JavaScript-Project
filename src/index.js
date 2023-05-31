import Game from "./game.js"

document.addEventListener("DOMContentLoaded", () => {
    console.log('Webpack testing works')
    
    const startButton = document.getElementById('start-button');
    const playAgainButton = document.getElementById('play-again');

    let game = new Game();

    startButton.addEventListener('click', () => {
        console.log("button is getting clicked");
        game.start();
        createTable(game);
    });

    playAgainButton.addEventListener('click', () => {
        game.start();
        createTable(game);
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

    // Adds the event listener 'click' for the buttons
    table.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const index = parseInt(e.target.dataset.pokemon);
            if (index === game.hiddenPairIndex) {
                // Player loses
                console.log('LOSER LOSER YOU SNOOZEZ');
                game.gameOver();
            } else {
                game.revealPair(index);
                if (game.isGameWon()) {
                    console.log('WINNER WINNER CHICKEN DINNER');
                }
            }
        }
    });
};

export { createTable };