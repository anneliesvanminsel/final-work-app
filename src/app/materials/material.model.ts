export class Material {
    public material_id: number;
    public name: string;
    public date: string;
    public course_id: number;

    constructor (material_id: number, name: string, date: string, course_id: number) {
        this.material_id = material_id;
        this.name = name;
        this.date = date;
        this.course_id = course_id;
    }
}
