export class Exercise {
    public id: string;
    public title: string;
    public description: string;
    public type: string;
    public material_id: string;

    constructor (id: string, title: string, description: string, type: string, material_id: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.material_id = material_id;
    }
}
