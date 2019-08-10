export class Student {
    public email: string;
    public name: string;
    public class_id: string;

    constructor(name: string, email: string, classid: string) {
        this.email = email;
        this.name = name;
        this.class_id = classid
    }
}
