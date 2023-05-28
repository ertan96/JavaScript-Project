import MovingObject from "./moving_object";

class Pokemon extends MovingObject {

    constructor(imagePath, canvas, ctx, scale, isSilhouette) {
        super(imagePath, canvas, ctx, scale);
        this.isSilhouette = isSilhouette;
        this.isRevealed = false;
    }

    applySilhouette() { //function was pulled from a script online for silhouette on canvas

        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
    
        for (let i = 0; i < data.length; i += 4) {
            // Check if the pixel is not fully transparent
            if (data[i + 3] !== 0) {
                data[i] = 0; // Set red channel to black
                data[i + 1] = 0; // Set green channel to black
                data[i + 2] = 0; // Set blue channel to black
            }
        }
    
        this.ctx.putImageData(imageData, 0, 0);
    }

    draw() {
        if (this.isSilhouette) {
            this.applySilhouette();
        }
        supe.draw();
    }

    startAnimation() {
        this.applySilhouette();
        super.startAnimation();
    }

}

export default Pokemon;