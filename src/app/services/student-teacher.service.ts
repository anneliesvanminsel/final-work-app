import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import { Student} from '../models/student.model';

@Injectable()
export class StudentTeacherService {
    private studentCollection: AngularFirestoreCollection<Student>;
    private studentList: Observable<Student[]>;
    private students: Student[] = [];


    constructor(private db: AngularFirestore) {

        this.studentCollection = db.collection("/student", ref =>
            ref.orderBy("name", "asc")
        );

        this.studentList = this.studentCollection.snapshotChanges().pipe(
            map(actions =>
                actions.map(a => {
                    const data = a.payload.doc.data() as Student;
                    return data;
                })
            )
        );
    }

    async getStudentsByClass(class_id: string) {
        await this.emptyStudents();

        await this.db.collection("/student", ref => ref.where("class_id", '==', class_id)).get().subscribe(value => {
            value.forEach((doc) => {
                const newStudent = <Student> doc.data();
                this.students.push(newStudent);
            });
        });
    };

    getStudents() {
        return this.students;
    }

    addStudent(newStudent) {
        this.studentCollection.add(newStudent);
    }

    updateStudent(id: string, name: string) {
        this.studentCollection[id].name = name;
    }

    emptyStudents () {
        this.students = new Array();
    }
}