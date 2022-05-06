import {BaseShape} from "../../../canvasbp/ts";
import {settings} from "../settings";

export class Cell extends BaseShape {
    private readonly w: number;
    private readonly h: number;
    value: null | number;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, positionX: number, rowY: number) {
        super(canvasElement, ctx);

        this.position = {
            x: positionX,
            y: rowY,
        }

        this.w = settings.grid.cells.w;
        this.h = settings.grid.cells.h;

        this.value = 0;

        this.draw();
    }

    draw(): void {
        this.ctx.beginPath();
        if (this.value) this.ctx.fillStyle = `hsl(${this.value*10}, 50%, 50%)`;
        else this.ctx.fillStyle = 'hsla(43, 62%, 74%, 1)';
        this.ctx.fillRect(this.position.x, this.position.y, this.w, this.h);
        this.ctx.stroke();
        this.ctx.closePath();

        if (this.value){
            this.ctx.beginPath();
            this.ctx.font = "bold 32px Arial";
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center'
            this.ctx.fillText(this.value.toString(), this.position.x + this.w/2, this.position.y + this.h/2 + 32/2);
            this.ctx.closePath();
        }
    }
}