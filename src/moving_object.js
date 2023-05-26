class MovingObject {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.game = options.game;
        this.image = options.image;
        this.width = options.width;
        this.height = options.height;
    }

    draw(ctx) {
        const pikachu = document.getElementById('pikachu');
        ctx.drawImage(pikachu, this.pos[0], this.pos[1]);
    }

    move() {
        // Update the position based on the velocity
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.bounce();
    }

    bounce() {
        
    }
}

export default MovingObject;