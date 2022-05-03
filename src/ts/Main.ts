import {ScaffoldCanvas} from "./canvases/ScaffoldCanvas";

class Main {
    private readonly scaffoldCanvasElement: HTMLCanvasElement;
    private readonly scaffoldCtx: CanvasRenderingContext2D;
    private scaffoldCanvas: ScaffoldCanvas;

    constructor() {
        this.scaffoldCanvasElement = document.getElementById('red-scaffold') as HTMLCanvasElement;
        this.scaffoldCtx = this.scaffoldCanvasElement.getContext('2d') as CanvasRenderingContext2D;
        this.scaffoldCanvas = new ScaffoldCanvas(this.scaffoldCanvasElement, this.scaffoldCtx);
    }
}
new Main();