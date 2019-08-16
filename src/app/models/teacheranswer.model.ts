export class TeacherAnswer {
    public id: string;
    public label: string;
    public rightanswer: boolean;
    public question_id: string;

    constructor (id: string, label: string, rightanswer: boolean, question_id: string) {
        this.id = id;
        this.label = label;
        this.rightanswer = rightanswer;
        this.question_id = question_id;
    }
}
