import Game from "./game.js"

document.addEventListener("DOMContentLoaded", () => {
    console.log('Webpack testing works')

    const startButton = document.getElementById('start-button');
    
    startButton.addEventListener('click', () => {
        console.log("button is getting clicked");
        const game = new Game();
        game.start();
        createTable(game);
    });

    // function createTable(game) {
    //     const container = document.querySelector('.container');
    //     const table = document.createElement('table');
    //     for (let i = 0; i < 2; i++) {
    //         const row = document.createElement('tr');
    //         for (let j = 0; j < 2; j++) {
    //             const cell = document.createElement('td');
    //             const imgButton = document.createElement('img');
    //             imgButton.src = game.pairs[i*2 + j].actual.imagePath; // set the image source to the actual Pokemon image

    //             // console.log(game.pairs); // Check if game.pairs is populated as expected
    //             // console.log(game.pairs[i*2 + j].actual); // Check if this is defined
    //             // console.log(game.pairs[i*2 + j].actual.imagePath); // Check if imagePath is defined


    //             imgButton.dataset.pokemon = i*2 + j; // Assign the index to the button
    //             imgButton.classList.add('pokemon-button'); // Add a class for styling
    //             cell.appendChild(imgButton);
    //             row.appendChild(cell);
    //         }
    //         table.appendChild(row);
    //     }
    //     container.appendChild(table);
    
    //     // Add the event listener for the buttons
    //     table.addEventListener('click', (e) => {
    //         if (e.target.tagName === 'IMG') {
    //             const index = parseInt(e.target.dataset.pokemon);
    //             if (index === game.hiddenPairIndex) {
    //                 // Player loses
    //                 console.log('You lose!');
    //             } else {
    //                 game.revealPair(index);
    //                 if (game.isGameOver()) {
    //                     console.log('You win!');
    //                 }
    //             }
    //         }
    //     });
    // }

    function createTable(game) {
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
    
        // Add the event listener for the buttons
        table.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                const index = parseInt(e.target.dataset.pokemon);
                if (index === game.hiddenPairIndex) {
                    // Player loses
                    console.log('You lose!');
                } else {
                    game.revealPair(index);
                    if (game.isGameOver()) {
                        console.log('You win!');
                    }
                }
            }
        });
    }
    
});