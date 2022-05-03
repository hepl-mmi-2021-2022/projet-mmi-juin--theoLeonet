import {IHasCanvas} from "../IHasCanvas";
import {IIsDrawable} from "./IIsDrawable";

export abstract class BaseImage implements IHasCanvas, IIsDrawable {
    canvasElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement;
    position: {x: number, y: number};

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvasElement = canvasElement;
        this.ctx = ctx;
        this.image = new Image();
        this.position = {
            x: 0,
            y: 0,
        }
    }

    createAndLoad(src: string){
        this.image.src = src;
        this.image.addEventListener('load', ()=>this.draw());
    }

    abstract draw(): void;
}
