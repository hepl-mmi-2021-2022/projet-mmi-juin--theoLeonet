import {settings} from "../settings";
import {Row} from "./Row";
import {Cell} from "./Cell";

export class CellGrid {
    private readonly canvasElement: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private rows: Row[];
    cells: Cell[];
    private randomCell: Cell;
    private emptyCells: Cell[];
    private hasMoved: boolean;
    private score: HTMLSpanElement;
    private scoreValue: number;
    private best: any;
    private bestElement: HTMLSpanElement;
    private gameEndForm: HTMLTemplateElement;
    private gameEndFormClone: Node;
    private resetButton: HTMLButtonElement;
    private gameOver: Boolean;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, score: HTMLSpanElement, best: HTMLSpanElement) {
        this.gameOver = false;

        this.canvasElement = canvasElement;
        this.ctx = ctx;

        this.cells = [];
        this.rows = [];
        this.emptyCells = [];

        this.hasMoved = false;

        this.score = score;
        this.bestElement = best;

        this.createGrid(settings.grid.rowNumber, 0);

        this.getCells();
        this.getRandomCells(2);

        this.getDirection();

        this.saveAndUpdateBestScore();
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
            this.clearAndDrawCells();
        }
    }

    slideRight(istTest = false) {
        this.rows.forEach((row: Row) => {
            for (let i = 0; i < row.cells.length + 10; i++) {
                for (let i = row.cells.length - 2; i >= 0; i--) {
                    if (row.cells[i].value && !row.cells[i + 1].value) {
                        if (!istTest) {
                            row.cells[i + 1].value = row.cells[i].value;
                            row.cells[i].value = 0;
                        }
                        this.hasMoved = true;
                    }
                }
            }
        })
    }

    mergeRight(isTest = false) {
        this.slideRight(isTest);
        this.rows.forEach((row: Row) => {
            for (let i = row.cells.length - 1; i > 0; i--) {
                if (row.cells[i].value && row.cells[i - 1].value === row.cells[i].value) {
                    if (!isTest) {
                        row.cells[i].value *= 2;
                        row.cells[i - 1].value = 0;
                        this.scoreValue = parseInt(this.score.innerText) + row.cells[i].value;
                        this.score.innerText = this.scoreValue.toString();
                        this.saveAndUpdateBestScore();
                    }
                    this.hasMoved = true;
                }
            }
        })
        this.slideRight(isTest);
    }

    slideLeft(istTest = false) {
        this.rows.forEach((row: Row) => {
            for (let i = 0; i < row.cells.length; i++) {
                for (let j = 1; j < row.cells.length; j++) {
                    if (row.cells[j].value && !row.cells[j - 1].value) {
                        if (!istTest) {
                            row.cells[j - 1].value = row.cells[j].value;
                            row.cells[j].value = 0;
                        }
                        this.hasMoved = true;
                    }
                }
            }
        })
    }

    mergeLeft(isTest = false) {
        this.slideLeft(isTest);
        this.rows.forEach((row: Row) => {
            for (let i = 0; i < row.cells.length - 1; i++) {
                if (row.cells[i].value && row.cells[i + 1].value === row.cells[i].value) {
                    if (!isTest) {
                        row.cells[i].value *= 2;
                        row.cells[i + 1].value = 0;
                        this.scoreValue = parseInt(this.score.innerText) + row.cells[i].value;
                        this.score.innerText = this.scoreValue.toString();
                        this.saveAndUpdateBestScore();
                    }
                    this.hasMoved = true;
                }
            }
        })
        this.slideLeft(isTest);
    }

    slideDown(isTest = false) {
        for (let i = 0; i < 3; i++) {
            for (let i = 0; i < this.cells.length - 4; i++) {
                if (this.cells[i].value && !this.cells[i + 4].value) {
                    if (!isTest) {
                        this.cells[i + 4].value = this.cells[i].value;
                        this.cells[i].value = 0;
                    }
                    this.hasMoved = true;
                }
            }
        }
    }

    mergeDown(isTest = false) {
        this.slideDown(isTest);
        for (let i = this.cells.length - 1; i >= 4; i--) {
            if (this.cells[i].value && this.cells[i - 4].value === this.cells[i].value) {
                if (!isTest) {
                    this.cells[i].value *= 2;
                    this.cells[i - 4].value = 0;
                    this.scoreValue = parseInt(this.score.innerText) + this.cells[i].value;
                    this.score.innerText = this.scoreValue.toString();
                    this.saveAndUpdateBestScore();
                }
                this.hasMoved = true;
            }
        }
        this.slideDown(isTest);
    }

    slideUp(isTest = false) {
        for (let i = 0; i < 3; i++) {
            for (let i = this.cells.length - 1; i >= 4; i--) {
                if (this.cells[i].value && !this.cells[i - 4].value) {
                    if (!isTest) {
                        this.cells[i - 4].value = this.cells[i].value;
                        this.cells[i].value = 0;
                    }
                    this.hasMoved = true;
                }
            }
        }
    }

    mergeUp(isTest = false) {
        this.slideUp(isTest);
        for (let i = 0; i < this.cells.length - 4; i++) {
            if (this.cells[i].value && this.cells[i + 4].value === this.cells[i].value) {
                if (!isTest) {
                    this.cells[i].value *= 2;
                    this.cells[i + 4].value = 0;
                    this.scoreValue = parseInt(this.score.innerText) + this.cells[i].value;
                    this.score.innerText = this.scoreValue.toString();
                    this.saveAndUpdateBestScore();
                }
                this.hasMoved = true;
            }
        }
        this.slideUp(isTest);
    }

    getDirection() {
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

            if (this.hasMoved) {
                this.getRandomCells(1);
                this.clearAndDrawCells();
                this.hasMoved = false;
            }

            if (this.emptyCells.length === 1 && !this.gameOver) {
                this.checkForMoves();
            }
        })
    }

    checkForMoves() {
        if (!this.gameOver){
            this.mergeRight(true);
            this.mergeLeft(true);
            this.mergeDown(true);
            this.mergeUp(true);
            if (!this.hasMoved) {
                this.gameEndForm = document.querySelector('.endFormTemplate') as HTMLTemplateElement;
                this.gameEndFormClone = this.gameEndForm.content.cloneNode(true);
                document.querySelector('.ui').appendChild(this.gameEndFormClone);
                this.resetButton = document.querySelector('.startAgainButton') as HTMLButtonElement;
                this.addEventListeners();
                this.gameOver = true;
            }
        }
    }

    clearAndDrawCells() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.cells.forEach((cell: Cell) => {
            cell.draw()
        })
    }

    saveAndUpdateBestScore() {
        this.best = localStorage.getItem('best');

        if (parseInt(this.best) <= parseInt(this.score.innerText) || this.best == null) {
            this.best = localStorage.setItem('best', this.score.innerText);
            this.best = localStorage.getItem('best');
        }

        this.bestElement.innerText = this.best;
    }

    resetGame() {
        document.querySelector('.ui').removeChild(document.querySelector('.restart'));
        this.cells.forEach((cell) => {
            cell.value = 0;
            this.score.innerText = '0';
            this.gameOver = true;
        })
        this.clearAndDrawCells();
        this.getRandomCells(2);
    }

    addEventListeners() {
        this.resetButton.addEventListener('click', () => {
            this.resetGame();
            this.gameOver = false;
        })
    }
}