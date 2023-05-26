import GameView from "./game_view.js"
import Game from "./game.js"

document.addEventListener("DOMContentLoaded", () => {
    console.log('Webpack is working')
    const canvas = document.getElementById('view-canvas');
    canvas.width = 600;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = '#F7E7CE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const pikachu = document.getElementById('pikachu');
    pikachu.style.width = '100px';

    function drawPokemon() {
        ctx.drawImage(pikachu, 150, 150, 200, 200);
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawPokemon();

        requestAnimationFrame(update);
    }

    // update();




    // const game = new Game();
    // new GameView(game, ctx);
  });