import {BaseImage} from "../../../canvasbp/ts";

export class Scaffold extends BaseImage{

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvasElement, ctx);

        this.createAndLoad('./src/images/donkey-big.jpg');
        this.position = {
            x: 0,
            y: 0
        }
    }

    draw(): void {
        this.ctx.drawImage(this.image, 1065, 819, 50, 28, this.position.x, this.position.y, 56, 28);
    }
}