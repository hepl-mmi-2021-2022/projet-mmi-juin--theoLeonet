import {BaseImage} from "../../../canvasbp/ts";

export class Scaffold extends BaseImage{
    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvasElement, ctx);

        this.createAndLoad('./src/images/donkey-kong_sprites.jpg');
    }

    draw(): void {
        this.ctx.drawImage(this.image, 324, 250, 16, 8, this.position.x, this.position.y, 16, 8);
    }
}