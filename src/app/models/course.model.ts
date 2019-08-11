export class Course {
    public id: string;
    public name: string;
    public year: string;
    public allowedClasses: [any];

    constructor (id: string, name: string, year: string, allowedClass: string) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.allowedClasses.push(allowedClass);
  }
}
