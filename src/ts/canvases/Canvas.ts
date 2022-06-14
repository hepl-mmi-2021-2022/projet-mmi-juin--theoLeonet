import {BaseCanvas} from "../../../canvasbp/ts";
import {CellGrid} from "../components/CellGrid";
import {settings} from "../settings";

export class Canvas extends BaseCanvas {
    private readonly cellGrid: CellGrid;
    private scoreText: number;
    private score: HTMLSpanElement;
    private best: HTMLSpanElement;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvasElement, ctx);
        this.resizeEventListener();
        this.preventScroll();

        if (innerWidth > 520){
            this.canvasElement.width = this.canvasElement.height = settings.canvas.bss;
        }
        else {
            this.canvasElement.width = this.canvasElement.height = settings.canvas.sss;
        }

        this.score = document.querySelector('.score span') as HTMLSpanElement;
        this.best = document.querySelector('#best span') as HTMLSpanElement

        this.cellGrid = new CellGrid(canvasElement, ctx, this.score, this.best);
    }

    protected resizeEventListener() {
        window.addEventListener('resize', () => {
            if (innerWidth > 520){
                this.canvasElement.width = this.canvasElement.height = settings.canvas.bss;
            }
            else {
                this.canvasElement.width = this.canvasElement.height = settings.canvas.sss;
            }
            this.cellGrid.clearAndDrawCells();
        });
    }

    private preventScroll() {
        window.addEventListener("keydown", function(e) {
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);
    }
}