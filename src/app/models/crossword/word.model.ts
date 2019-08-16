export enum Axis {
    x, y
}

export class Word {
    private _x: number;
    private _y: number;
    private _clue: number;
    private _axis: Axis;
    private _question: string;
    private _answer: string;

    constructor(x: number, y: number, clue: number, axis: Axis, question: string, answer: string) {
        this.x = x;
        this.y = y;
        this.clue = clue;
        this.axis = axis;
        this.question = question;
        this.answer = answer;
    }

    get x(): number {
        return this._x;
    }

    set x(newX: number) {
        this._x = newX;
    }

    get y(): number {
        return this._y;
    }

    set y(newY: number) {
        this._y = newY;
    }

    get clue(): number {
        return this._clue;
    }

    set clue(newClue: number) {
        this._clue = newClue;
    }

    get axis(): Axis {
        return this._axis;
    }

    set axis(newAxis: Axis) {
        this._axis = newAxis;
    }

    get question(): string {
        return this._question;
    }

    set question(newQuestion: string) {
        this._question = newQuestion;
    }

    get answer(): string {
        return this._answer;
    }

    set answer(newAnswer: string) {
        this._answer = newAnswer;
    }

    public get isOnAxisX(): boolean {
        return this.axis === Axis.x;
    }

    public get isOnAxisY(): boolean {
        return this.axis === Axis.y;
    }

    public get length(): number {
        return this.answer.length;
    }

    public get minX(): number {
        return this.x;
    }

    public get maxX(): number {
        return this.isOnAxisX ? this.x + this.length : this.x;
    }

    public get minY(): number {
        return this.y;
    }

    public get maxY(): number {
        return this.isOnAxisY ? this.y + this.length : this.y;
    }

    public isPositionInRange(x: number, y: number): boolean {
        return this.minX <= x && this.minY <= y && this.maxX >= x && this.maxY >= y;
    }
}
