import {Cell} from "./Cell";
import {settings} from "../settings";
import {IHasCanvas} from "../../../canvasbp/ts";

export class Row implements IHasCanvas {
    canvasElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    cells: Cell[];
    private filteredCells: Cell[];
    private missingCells: number;
    private emptyCells: any;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, rowY: number) {
        this.canvasElement = canvasElement;
        this.ctx = ctx;
        this.cells = [];
        this.createRow(innerWidth > 520 ? settings.grid.bsg : settings.grid.ssg , rowY);
    }

    createRow(cellX: number, rowY: number): Cell[] {
        for (let i = 0; i < settings.grid.columnNumber; i++) {
            this.cells.push(new Cell(this.canvasElement, this.ctx, cellX, rowY));
            if (innerWidth > 520){
                cellX += settings.grid.bsg + settings.grid.cells.bss;
            }
            else {
                cellX += settings.grid.ssg + settings.grid.cells.sss;
            }
        }
        cellX = 0;
        return this.cells;
    }


}