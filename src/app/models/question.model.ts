export class Question {
    public id: string;
    public title: string;
    public description: string;
    public exercise_id: string;

    constructor (id: string, title: string, description: string, exercise_id: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.exercise_id = exercise_id;
    }
}
