export class Student {
    email: string;
    name: string;
    class_id: string;

    constructor(name: string, email: string, class_id: string) {
        this.email = email;
        this.name = name;
        this.class_id = class_id
    }
}
