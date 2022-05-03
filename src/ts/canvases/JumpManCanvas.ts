import {BaseCanvas} from "../../../canvasbp/ts";
import {JumpMan} from "../components/JumpMan";
import {JumpManControl} from "../controllers/JumpManControl";

export class JumpManCanvas extends BaseCanvas{
    jumpMan: JumpMan;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvasElement, ctx);

        this.fullWindowResize();
        this.resizeEventListener();

        this.jumpMan = new JumpMan(this.canvasElement, this.ctx);
    }
}