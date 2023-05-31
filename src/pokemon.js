import MovingObject from "./moving_object";

class Pokemon extends MovingObject {

    constructor(imagePath, canvas, ctx, scale, isSilhouette = true) {
        super(imagePath, canvas, ctx, scale);
        this.imagePath = imagePath;
        this.isSilhouette = isSilhouette;
        this.isRevealed = false;
    }

    applySilhouette(imageData) { //function was pulled from a script online for silhouette on canvas
        const data = imageData.data;
    
        for (let i = 0; i < data.length; i += 4) {
            // Check if the pixel is not fully transparent
            if (data[i + 3] !== 0) {
                data[i] = 0; // Set red channel to black
                data[i + 1] = 0; // Set green channel to black
                data[i + 2] = 0; // Set blue channel to black
            }
        }
    
        return imageData;
    }

    draw() { 
        // super.draw();

        // if (this.isSilhouette && !this.isRevealed) { // applies silhouette if instance is a silhouette but not revealed
        //     const tempCanvas = document.createElement('canvas');
        //     const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        //     const silhouetteData = this.applySilhouette(imageData);
        //     this.ctx.putImageData(silhouetteData, 0, 0);
        // }


        // Always move the Pokemon regardless of its state
        this.move();

        // If it's a silhouette and not revealed, apply silhouette effect
        if (this.isSilhouette && !this.isRevealed) {
            // create a temporary canvas to draw the image and apply the silhouette effect
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = this.canvas.width;
            tempCanvas.height = this.canvas.height;
            const tempCtx = tempCanvas.getContext('2d');

            // draw the image onto the temporary canvas
            tempCtx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);

            // apply the silhouette effect to the image data from the temporary canvas
            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const silhouetteData = this.applySilhouette(imageData);

            // put the silhouette data back onto the temporary canvas
            tempCtx.putImageData(silhouetteData, 0, 0);

            // draw the silhouette from the temporary canvas onto the main canvas
            this.ctx.save();
            this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            this.ctx.rotate(this.angle);
            this.ctx.drawImage(tempCanvas, -this.width / 2, -this.height / 2, this.width, this.height);
            this.ctx.restore();
        } else {
            // If it's not a silhouette or it's revealed, just draw the image
            super.draw();
        }
    }
    


    reveal() { // Reveal the actual image if this isn't a silhouette

        this.isRevealed = true;
        this.isSilhouette = false;
        this.draw();
        // console.log(`Pokemon class.reveal: Pokemon revealed: ${this.isRevealed}`);
    }

}

export default Pokemon;