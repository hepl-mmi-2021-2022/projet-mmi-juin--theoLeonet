import {Canvas} from "../canvases/Canvas";

export class GameController {
    private canvas: Canvas;
    private readonly canvasElement: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private score: HTMLParagraphElement;

    constructor() {
        this.canvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.ctx = this.canvasElement.getContext('2d');
        this.canvas = new Canvas(this.canvasElement, this.ctx);
    }
}