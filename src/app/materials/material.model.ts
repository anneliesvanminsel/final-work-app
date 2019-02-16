export class Material{
    public name: string;
    public date: string;
    public course_id: number;

    constructor (name: string, date: string, course_id: number){
        this.name = name;
        this.date = date;
        this.course_id = course_id;
    }

}