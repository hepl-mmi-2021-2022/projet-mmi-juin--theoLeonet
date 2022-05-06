import {BaseCanvas} from "../../../canvasbp/ts";
import {CellGrid} from "../components/CellGrid";
import {Cell} from "../components/Cell";
import {Score} from "../components/Score";

export class Canvas extends BaseCanvas {
    private readonly cellGrid: CellGrid;
    private score: Score;
    private scoreText: number;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvasElement, ctx);

        this.fullWindowResize();
        this.resizeEventListener();

        this.score = new Score(this.canvasElement, this.ctx, 0);

        this.cellGrid = new CellGrid(canvasElement, ctx, this.score);
    }

    protected resizeEventListener() {
        window.addEventListener('resize', ()=>{
            this.fullWindowResize();
            this.cellGrid.clearAndDrawCells();
        });
    }
}