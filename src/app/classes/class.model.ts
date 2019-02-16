export class Course {
  public class_id: number;
  public name: string;
  public date: string;

  constructor (class_id: number, name: string, date: string) {
    this.class_id = class_id;
    this.name = name;
    this.date = date;
  }
}
