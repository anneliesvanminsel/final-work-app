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
    private students: Student[] = [];


    constructor(private db: AngularFirestore) {

        this.studentCollection = db.collection("/student", ref =>
            ref.orderBy("name", "asc")
        );
    }

    getStudentsByClass(class_id: string): Observable<Student[]> {
        return  this.db.collection("/student", ref => ref.where("class_id", '==', class_id)).get()
            .pipe(
                map(value => {
                    const studentArray = [];
                    value.docs.forEach(
                        doc => {
                            const student: Student = {
                                id: doc.id,
                                name: doc.data().name,
                                email: doc.data().email,
                                class_id: doc.data().class_id,
                            };
                            studentArray.push(student)
                        }
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
