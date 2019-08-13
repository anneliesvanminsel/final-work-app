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
    }

    getStudentsByClass(class_id: string): Observable<any> {
        return  this.db.collection("/student", ref => ref.where("class_id", '==', class_id)).get()
            .pipe(
                map(value => {
                    const studentArray = [];
                    value.docs.forEach(
                        doc => studentArray.push(doc.data())
                    );
                    return studentArray;
                })
            );

    };

    addStudent(newStudent) {
        this.studentCollection.add(newStudent);
    }

    updateStudent(id: string, name: string) {
        this.studentCollection[id].name = name;
    }

    emptyStudents () {
    /*.subscribe(value => {
            value.forEach((doc) => {
                const newStudent = <Student> doc.data();
                this.students.push(newStudent);
            });
        });*/
        this.students = [];
    }
}
