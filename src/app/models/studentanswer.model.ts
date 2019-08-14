export class StudentAnswer {
    public id: string;
    public label: string;
    public student_id: string;
    public question_id: string;

    constructor (id: string, label: string, student_id: string, question_id: string) {
        this.id = id;
        this.label = label;
        this.student_id = student_id;
        this.question_id = question_id;
    }
}
