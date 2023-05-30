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
        super.draw();

        if (this.isSilhouette && !this.isRevealed) { // applies silhouette if instance is a silhouette but not revealed
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const silhouetteData = this.applySilhouette(imageData);
            this.ctx.putImageData(silhouetteData, 0, 0);
        }

        // if (this.isSilhouette) {
        //     const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        //     const silhouetteData = this.applySilhouette(imageData);
        //     this.ctx.putImageData(silhouetteData, 0, 0);
        // }

        // if (this.isRevealed) {
        //     const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        //     console.log('hit');
        //     this.ctx.putImageData(imageData, 0, 0);
        // }
    }
    
    // animate() {
    //     return new Promise(resolve => {
    //         const frame = () => {
    //             this.move();
    //             this.draw();

    //             if (this.isRevealed) {
    //                 resolve();
    //             } else {
    //                 requestAnimationFrame(frame);
    //             }
    //         }
    //         requestAnimationFrame(frame);
    //     });
    // }

    reveal() { // Reveal the actual image if this isn't a silhouette

        this.isRevealed = true;
        this.isSilhouette = false;
        this.startAnimation();
        // console.log(`Pokemon class.reveal: Pokemon revealed: ${this.isRevealed}`);
    }

}

export default Pokemon;