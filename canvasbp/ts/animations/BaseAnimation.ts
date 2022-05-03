import {IIsAnimation} from "./IIsAnimation";
import {BaseCanvas} from "../canvases/BaseCanvas";
import {IHasCanvas} from "../IHasCanvas";

export abstract class BaseAnimation implements IIsAnimation, IHasCanvas{
    canvasElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvas: BaseCanvas;

    protected constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvasElement = canvasElement;
        this.ctx = ctx;
    }

    abstract animate(): void;

    clear(): void{
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    loop(): void{
        requestAnimationFrame(()=>this.animate());
    }
}