import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import { Course} from '../models/course.model';

@Injectable()
export class CourseService {
    private courseCollection: AngularFirestoreCollection<Course>;
    private courses$: Observable<Course[]>;
    private courseDetail: Course;

    constructor(private db: AngularFirestore) {
        this.courseCollection = db.collection("/course", ref =>
            ref.orderBy("name", "asc")
        );
    }

    getCourses() {
        this.courses$ = this.courseCollection.snapshotChanges().pipe(
            map(actions =>
                actions.map(a => {
                    const data = a.payload.doc.data() as Course;
                    data.id = a.payload.doc.id;
                    return data;
                })
            )
        );
        return this.courses$;
    }

    async getCourseFromDb(id: string){
        await this.courseCollection.doc(id).ref.get().then((doc) => {
            if (doc.exists) {
                this.courseDetail = <Course> doc.data();
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    get course() : Course {
        return this.courseDetail;
    }

    addCourse(newCourse) {
        this.courseCollection.add(newCourse);
    }

    updateCourse(id: string, name: string) {
        this.courseCollection[id].name = name;
    }
}
