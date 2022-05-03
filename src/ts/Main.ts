import {ScaffoldCanvas} from "./canvases/ScaffoldCanvas";
import {JumpManCanvas} from "./canvases/JumpManCanvas";
import {JumpManAnimation} from "./animations/JumpManAnimation";

class Main {
    private readonly scaffoldCanvasElement: HTMLCanvasElement;
    private readonly scaffoldCtx: CanvasRenderingContext2D;
    private scaffoldCanvas: ScaffoldCanvas;

    private readonly jumpManCanvasElement: HTMLCanvasElement;
    private readonly jumpManCtx: CanvasRenderingContext2D;
    private jumpManAnimation: JumpManAnimation;

    constructor() {
        /*this.scaffoldCanvasElement = document.getElementById('red-scaffold') as HTMLCanvasElement;
        this.scaffoldCtx = this.scaffoldCanvasElement.getContext('2d') as CanvasRenderingContext2D;
        this.scaffoldCanvas = new ScaffoldCanvas(this.scaffoldCanvasElement, this.scaffoldCtx);*/

        this.jumpManCanvasElement = document.getElementById('jump-man') as HTMLCanvasElement;
        this.jumpManCtx = this.jumpManCanvasElement.getContext('2d') as CanvasRenderingContext2D;
        this.jumpManAnimation = new JumpManAnimation(this.jumpManCanvasElement, this.jumpManCtx)
    }
}
new Main();