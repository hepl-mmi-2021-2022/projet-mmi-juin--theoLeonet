import {BaseShape} from "../../../canvasbp/ts";

export class Score extends BaseShape{
    score: number;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, score: number) {
        super(canvasElement, ctx);

        this.score = score;
        this.draw()
    }
    draw(): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.score.toString(), this.canvasElement.width/2, 100);
        this.ctx.closePath();
    }
}