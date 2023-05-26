import Game from './game.js';
import GameView from './game_view.js';

const game = new Game();
const gameView = new GameView(game);


gameView.start();