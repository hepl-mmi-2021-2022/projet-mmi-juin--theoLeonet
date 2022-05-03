import {BaseAnimation} from "../../../canvasbp/ts";
import {JumpManCanvas} from "../canvases/JumpManCanvas";

export class JumpManAnimation extends BaseAnimation{
    private jumpManCanvas: JumpManCanvas;
    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvasElement, ctx);

        this.jumpManCanvas = new JumpManCanvas(this.canvasElement, this.ctx);

        this.animate();
    }

    animate(): void {
        this.clear();

        this.jumpManCanvas.jumpMan.update();

        this.loop();
    }

}