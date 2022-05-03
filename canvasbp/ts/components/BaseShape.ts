import {IHasCanvas} from "../IHasCanvas";
import {IIsDrawable} from "./IIsDrawable";

export abstract class BaseShape implements IIsDrawable, IHasCanvas {
    canvasElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    position: { x: number, y: number };
    color: string;

    protected constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvasElement = canvasElement;
        this.ctx = ctx;
    }

    abstract draw(): void;
}
