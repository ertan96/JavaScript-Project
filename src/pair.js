import Pokemon from './pokemon.js';

class Pair {
    constructor(imagePath, canvas, ctx, scale) {
        this.silhouette = new Pokemon(imagePath, canvas, ctx, scale, true);
        this.actual = new Pokemon(imagePath, canvas, ctx, scale, false);
    }

    draw() {
        if (this.actual.isRevealed) {
            this.actual.draw();
        } else {
            this.silhouette.draw();
        }
    }

    stopAnimatingSilhouette() {
        this.silhouette.isRevealed = true; // stop the silhouette from animating
    }

    reveal() {
        this.actual.reveal();
        this.stopAnimatingSilhouette(); // stop the silhouette from animating
        console.log('321');
    }
}

export default Pair;