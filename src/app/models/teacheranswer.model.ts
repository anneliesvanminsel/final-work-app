export class TeacherAnswer {
    public id: string;
    public label: string;
    public rightorwrong: boolean;
    public question_id: string;

    constructor (id: string, label: string, rightorwrong: boolean, question_id: string) {
        this.id = id;
        this.label = label;
        this.rightorwrong = rightorwrong;
        this.question_id = question_id;
    }
}
