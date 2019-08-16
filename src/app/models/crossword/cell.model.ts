export class Cell {
    public x: number;
    public y: number;
    public clue: number;
    public value: string;
    public success: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
