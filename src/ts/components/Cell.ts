import {BaseShape} from "../../../canvasbp/ts";
import {settings} from "../settings";

export class Cell extends BaseShape {
    private w: number;
    private h: number;
    value: null | number;
    private colors: {};

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, positionX: number, rowY: number) {
        super(canvasElement, ctx);

        this.position = {
            x: positionX,
            y: rowY,
        }

        this.value = 0;

        console.log(this.colors); //{name: "John", date: "25-08-1989", age: "25"}

        this.draw();
    }

    draw(): void {
        if (innerWidth > 520){
            this.w = this.h = settings.grid.cells.bss;
        }
        else {
            this.w = this.h = settings.grid.cells.sss;
        }
        this.ctx.beginPath();
        if (this.value) {
            this.value <= 2048 ? this.ctx.fillStyle = settings.grid.cells.colors[this.value] : this.ctx.fillStyle = settings.grid.cells.colors[2048];
        }
        else this.ctx.fillStyle = 'hsla(31, 20%, 75%, 1)';
        this.ctx.fillRect(this.position.x, this.position.y, this.w, this.h);
        this.ctx.stroke();
        this.ctx.closePath();

        if (this.value){
            this.ctx.beginPath();
            this.ctx.font = "bold 32px Arial";
            if (this.value <= 4) this.ctx.fillStyle = '#776E65';
            else this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center'
            this.ctx.fillText(this.value.toString(), this.position.x + this.w/2, this.position.y + this.h/2 + 32/2);
            this.ctx.closePath();
        }
    }
}