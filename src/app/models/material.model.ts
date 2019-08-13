export class Material {
    public id: number;
    public name: string;
    public description: string;
    public date: string;
    public course_id: string;
    public theme_id: string;

    constructor (id: number, name: string, description: string, date: string, course_id: string, theme_id: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.course_id = course_id;
        this.theme_id = theme_id;
    }
}
