import {BaseCanvas} from "../../../canvasbp/ts";
import {Scaffold} from "../components/Scaffold";

export class ScaffoldCanvas extends BaseCanvas {
    private readonly scaffolds: Scaffold[];
    private currentScaffoldIndex: number;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvasElement, ctx);

        this.fullWindowResize();
        this.resizeEventListener();

        this.currentScaffoldIndex = 0;
        this.scaffolds = [];

        this.createScaffold(10, 4);
    }

    createScaffold(length: number, lineNumber: number) {
        for (let i = 0; i < lineNumber; i++) {
            for (let j = 0; j < length; j++) {
                this.scaffolds.push(new Scaffold(this.canvasElement, this.ctx));
                this.scaffolds[this.currentScaffoldIndex].position.x += 51 * j;
                this.scaffolds[this.currentScaffoldIndex].position.y += 100 * i;
                this.currentScaffoldIndex++;
            }
        }
    }
}