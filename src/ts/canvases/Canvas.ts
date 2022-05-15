import {BaseCanvas} from "../../../canvasbp/ts";
import {CellGrid} from "../components/CellGrid";
import {Cell} from "../components/Cell";

export class Canvas extends BaseCanvas {
    private readonly cellGrid: CellGrid;
    private scoreText: number;
    private score: HTMLSpanElement;
    private best: HTMLSpanElement;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvasElement, ctx);

        this.fullWindowResize();
        this.resizeEventListener();

        this.score = document.querySelector('.score span') as HTMLSpanElement;
        this.best = document.querySelector('#best span') as HTMLSpanElement

        this.cellGrid = new CellGrid(canvasElement, ctx, this.score, this.best);
    }

    protected resizeEventListener() {
        window.addEventListener('resize', () => {
            this.fullWindowResize();
            this.cellGrid.clearAndDrawCells();
        });
    }
}