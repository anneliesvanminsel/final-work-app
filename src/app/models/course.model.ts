export class Course {
    public course_id: number;
    public name: string;
    public date: string;

    constructor (course_id: number, name: string, date: string) {
        this.course_id = course_id;
        this.name = name;
        this.date = date;
  }
}
