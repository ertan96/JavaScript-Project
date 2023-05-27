import Game from "./game.js"

document.addEventListener("DOMContentLoaded", () => {
    console.log('Webpack testing works')

    const startButton = document.getElementById('start-button');
    
    startButton.addEventListener('click', () => {
        console.log("button is getting clicked");
        const game = new Game();
        game.start();
    });

    // const canvas = document.getElementById('view-canvas');
    // // canvas.width = Game.DIM_X;
    // // canvas.height = Game.DIM_Y;
    // canvas.width = 600;
    // canvas.height = 600;
    // const ctx = canvas.getContext("2d");

    // const pikachu = new Image();
    // pikachu.src = './src/pokemonImages/pikachu.png'; 

    // // Initialize the position, velocity, angle, and scale of Pikachu
    // let x = 200;
    // let y = 200;
    // let dx = 5; // Velocity in the x-axis
    // let dy = 5; // Velocity in the y-axis
    // let angle = 0; // Initial angle for spinning
    // let scale = 0.1; // Scaling factor for the image (50% of original size)
    // let width = 0; // Width of the scaled image
    // let height = 0; // Height of the scaled image

    // pikachu.onload = function() {
    //     // Calculate the scaled dimensions of the image
    //     width = pikachu.width * scale;
    //     height = pikachu.height * scale;

    //     // Randomizes the intial position of Pikachu
    //     x = Math.random() * (canvas.width - width);
    //     y = Math.random() * (canvas.height - height);

    //     draw();
    // };

    // function draw() {
    //     // Clear the canvas
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     // Update the position and angle of Pikachu
    //     x += dx;
    //     y += dy;
    //     angle += .1; // Adjust the spinning speed as needed

    //     // Check for collision with the canvas boundaries on the x-axis
    //     if (x + width > canvas.width || x < 0) {
    //         dx *= -1; // Reverse the velocity in the x-axis to bounce back
    //     }
    //     if (y + height > canvas.height || y < 0) {
    //         dy *= -1; // Reverse the velocity in the y-axis to bounce back
    //     }

    //     // Draw Pikachu with spinning effect and scaled size
    //     ctx.save();
    //     ctx.translate(x + width / 2, y + height / 2);
    //     ctx.rotate(angle);
    //     ctx.drawImage(pikachu, -width / 2, -height / 2, width, height);
    //     ctx.restore();

    //     // Request the next animation frame
    //     requestAnimationFrame(draw);
    // }


    
  });