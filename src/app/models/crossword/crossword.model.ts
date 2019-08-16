import { Cell } from './cell.model';
import { Word } from './word.model';
import { Grid } from './grid.model';

export class Crossword {
    private _id: string;
    private _words: Array<Word>;
    private _grid: Grid;

    constructor(id: string, words: Array<Word>) {
        this._id = id;
        this._words = words;
        this._grid = new Grid(this._words);
    }

    public get grid(): Array<Array<Cell>> {
        return this._grid.toArray();
    }

    public getCellByPosition(x: number, y: number) {
        return this._grid.getCellByPosition(x, y);
    }

    public getWordsWhereCellInRange(cell: Cell): Array<Word> {
        return this._words.filter(x => x.isPositionInRange(cell.x, cell.y));
    }
}
