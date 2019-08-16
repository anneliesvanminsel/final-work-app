import { Cell } from './cell.model';
import { Word } from './word.model';

export class Grid {
    private _width: number = 1;
    private _height: number = 1;
    private _words: Array<Word>;
    private _matrix: Array<Array<Cell>>;

    constructor(words: Array<Word>) {
        this._words = words;
        this._calculateMatrixRange();
        this._createMatrix();
        this._fillMatrix();
    }

    private _calculateMatrixRange(): void {
        for (let word of this._words) {
            if (word.maxX > this._width) {
                this._width = word.maxX;
            };

            if (word.maxY > this._height) {
                this._height = word.maxY;
            };
        }

        // console.log(`This matrix has ${this._width} width & ${this._height} height.`);
    }

    private _createMatrix(): void {
        this._matrix = new Array<Array<Cell>>();

        for (let y = 0; y < this._height; y++) {
            this._matrix[y] = new Array<Cell>();

            for (let x = 0; x < this._width; x++) {
                this._matrix[y][x] = null;
            }
        }
    }

    private _fillMatrix(): void {
        for (let word of this._words) {
            this._addWordToMatrix(word);
        }
    }

    private _addWordToMatrix(word: Word): void {
        for (let i = 0; i < word.length; i++) {
            let x = word.x;
            let y = word.y;

            if (word.isOnAxisX) { x = x + i; }
            if (word.isOnAxisY) { y = y + i; }

            let cell = this.getCellByPosition(x, y) || new Cell(x, y);

            if (i === 0) {
                cell.clue = word.clue;
            }

            this._matrix[y][x] = cell;
        }
    }

    public getCellByPosition(x: number, y: number): Cell {
        if (x < 0 || y < 0) { return null; }
        if (y > this._matrix.length) { return null; }
        if (!this._matrix[y] || x > this._matrix[y].length) { return null; }

        return this._matrix[y][x];
    }

    public toArray(): Array<Array<Cell>> {
        return this._matrix;
    }
}
