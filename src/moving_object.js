class MovingObject {
    constructor(imagePath, canvas, ctx, scale) {
        this.image = new Image();
        this.image.src = imagePath;
        this.canvas = canvas;
        this.ctx = ctx;
        this.scale = scale;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
        this.dx = 1; // Speed in the x-axis
        this.dy = 1; // Speed in the y-axis
        this.angle = 0; // To allow for spinning of the image

        this.image.onload = () => {
            this.width = this.image.width * this.scale;
            this.height = this.image.height * this.scale;
            this.x = Math.random() * (this.canvas.width - this.width);
            this.y = Math.random() * (this.canvas.height - this.height);
            this.draw();
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // clears canvas constantly everytime drawn
        
        this.x += this.dx;
        this.y += this.dy;
        this.angle += 0.01; // Spinning Speed adjustments
        
        if (this.x + this.width > this.canvas.width || this.x < 0) {
            this.dx *= -1;
        }
        if (this.y + this.height > this.canvas.height || this.y < 0) {
            this.dy *= -1;
        }
        
    
        this.ctx.save();
        this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        this.ctx.rotate(this.angle);
        this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.restore();
    
        requestAnimationFrame(() => this.draw());
    }

    startAnimation() {
        this.draw();
    }
}

export default MovingObject;