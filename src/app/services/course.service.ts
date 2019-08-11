import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import { Course} from '../models/course.model';

@Injectable()
export class CourseService {
    courseCollection: AngularFirestoreCollection<Course>;
    courses: Observable<Course[]>;

    constructor(db: AngularFirestore) {

        this.courseCollection = db.collection("/course", ref =>
            ref.orderBy("name", "asc")
        );

        this.courses = this.courseCollection.snapshotChanges().pipe(
            map(actions =>
                actions.map(a => {
                    const data = a.payload.doc.data() as Course;
                    data.id = a.payload.doc.id;
                    return data;
                })
            )
        );
    }

    getCourses() {
        return this.courses;
    }

    /*
    addCourse(name: string, date: string) {
        const newCourse = new Course(name, date);
        this.courseCollection.add(newCourse);
    }
    */

    updateCourse(id: string, name: string) {
        this.courseCollection[id].name = name;
    }
}
