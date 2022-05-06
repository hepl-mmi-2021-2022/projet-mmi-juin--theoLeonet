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
        this.createRow(this.canvasElement.width / 2 - (settings.grid.cells.w + settings.grid.gap) * settings.grid.columnNumber / 2, rowY + this.canvasElement.height / 2 - (settings.grid.cells.h + settings.grid.gap) * settings.grid.rowNumber / 2);
    }

    createRow(cellX: number, rowY: number): Cell[] {
        for (let i = 0; i < settings.grid.columnNumber; i++) {
            this.cells.push(new Cell(this.canvasElement, this.ctx, cellX, rowY));
            cellX += settings.grid.gap + settings.grid.cells.w;
        }
        cellX = 0;
        return this.cells;
    }


}