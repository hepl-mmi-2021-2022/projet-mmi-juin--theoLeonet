import {settings} from "../settings";
import {Row} from "./Row";
import {Cell} from "./Cell";
import {forEachResolvedProjectReference} from "ts-loader/dist/instances";
import {Score} from "./Score";

export class CellGrid {
    private readonly canvasElement: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private rows: Row[];
    cells: Cell[];
    private randomCell: Cell;
    private emptyCells: Cell[];
    private reversedX: boolean;
    private reversedY: boolean;
    private hasMoved: boolean;
    private score: Score;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, score: Score) {
        this.canvasElement = canvasElement;
        this.ctx = ctx;

        this.cells = [];
        this.rows = [];
        this.emptyCells = [];

        this.hasMoved = false;

        this.score = score;

        this.createGrid(settings.grid.rowNumber, 0);

        this.getCells();
        this.getRandomCells(2);

        this.addEventListeners();

        this.score.draw();
    }

    createGrid(rowNumber: number, rowY: number) {
        for (let i = 0; i < rowNumber; i++) {
            this.rows.push(new Row(this.canvasElement, this.ctx, rowY));
            rowY += settings.grid.gap + settings.grid.cells.h;
        }
    }

    getCells() {
        this.rows.forEach((row: Row) => {
            row.cells.forEach((cell: Cell) => {
                this.cells.push(cell);
            })
        })
    }

    getEmptyCells(): void {
        this.emptyCells = [];
        this.cells.forEach((cell: Cell) => {
            if (cell.value === 0) {
                this.emptyCells.push(cell);
            }
        })
    }

    getRandomCells(number: number): void {
        for (let i = 0; i < number; i++) {
            this.getEmptyCells();
            this.randomCell = this.emptyCells[(Math.floor(Math.random() * this.emptyCells.length))]
            Math.random() > .5 ? this.randomCell.value = 2 : this.randomCell.value = 4;
            this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.cells.forEach((cell: Cell) => cell.draw())
        }
    }

    slideRight() {
        this.rows.forEach((row: Row) => {
            for (let i = 0; i < row.cells.length + 10; i++) {
                for (let i = row.cells.length - 2; i >= 0; i--) {
                    if (row.cells[i].value && !row.cells[i + 1].value) {
                        row.cells[i + 1].value = row.cells[i].value;
                        row.cells[i].value = 0;
                        this.hasMoved = true;
                    }
                }
            }
        })
    }

    mergeRight() {
        this.slideRight();
        this.rows.forEach((row: Row) => {
            for (let i = row.cells.length - 1; i > 0; i--) {
                if (row.cells[i].value && row.cells[i - 1].value === row.cells[i].value) {
                    row.cells[i].value *= 2;
                    row.cells[i - 1].value = 0;
                    this.hasMoved = true;
                    this.score.score += row.cells[i].value;
                    console.log(this.score.score);
                }
            }
        })
        this.slideRight();
    }

    slideLeft() {
        this.rows.forEach((row: Row) => {
            for (let i = 0; i < row.cells.length; i++) {
                for (let j = 1; j < row.cells.length; j++) {
                    if (row.cells[j].value && !row.cells[j - 1].value) {
                        row.cells[j - 1].value = row.cells[j].value;
                        row.cells[j].value = 0;
                        this.hasMoved = true;
                    }
                }
            }
        })
    }

    mergeLeft() {
        this.slideLeft();
        this.rows.forEach((row: Row) => {
            for (let i = 0; i < row.cells.length - 1; i++) {
                if (row.cells[i].value && row.cells[i + 1].value === row.cells[i].value) {
                    row.cells[i].value *= 2;
                    row.cells[i + 1].value = 0;
                    this.hasMoved = true;
                    this.score.score += row.cells[i].value;
                    console.log(this.score.score);
                }
            }
        })
        this.slideLeft();
    }

    slideDown() {
        for (let i = 0; i < 3; i++) {
            for (let i = 0; i < this.cells.length - 4; i++) {
                if (this.cells[i].value && !this.cells[i + 4].value) {
                    this.cells[i + 4].value = this.cells[i].value;
                    this.cells[i].value = 0;
                    this.hasMoved = true;
                }
            }
        }
    }

    mergeDown() {
        this.slideDown();
        for (let i = this.cells.length - 1; i >= 4; i--) {
            if (this.cells[i].value && this.cells[i - 4].value === this.cells[i].value) {
                this.cells[i].value *= 2;
                this.cells[i - 4].value = 0;
                this.hasMoved = true;
                this.score.score += this.cells[i].value;
                console.log(this.score.score);
            }
        }
        this.slideDown();
    }

    slideUp() {
        for (let i = 0; i < 3; i++) {
            for (let i = this.cells.length - 1; i >= 4; i--) {
                if (this.cells[i].value && !this.cells[i - 4].value) {
                    this.cells[i - 4].value = this.cells[i].value;
                    this.cells[i].value = 0;
                    this.hasMoved = true;
                }
            }
        }
    }

    mergeUp(){
        this.slideUp();
        for (let i = 0; i < this.cells.length - 4; i++) {
            if (this.cells[i].value && this.cells[i + 4].value === this.cells[i].value) {
                this.cells[i].value *= 2;
                this.cells[i + 4].value = 0;
                this.hasMoved = true;
                this.score.score += this.cells[i].value;
                console.log(this.score.score);
            }
        }
        this.slideUp();
    }

    addEventListeners() {
        addEventListener('keydown', (key: KeyboardEvent) => {
            if (key.code === 'ArrowRight') {
                this.mergeRight();
            }
            if (key.code === 'ArrowLeft') {
                this.mergeLeft();
            }
            if (key.code === 'ArrowDown') {
                this.mergeDown();
            }
            if (key.code === 'ArrowUp') {
                this.mergeUp();
            }
            if (this.hasMoved){
                this.getRandomCells(1);
                this.clearAndDrawCells();
                this.hasMoved = false;
            }
        })
    }

    clearAndDrawCells() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.cells.forEach((cell: Cell) => {
            cell.draw()
        })
        this.score.draw();
    }
}