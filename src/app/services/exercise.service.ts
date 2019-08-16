import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import {Exercise} from '../models/exercise.model';

@Injectable()
export class ExerciseService {
    private exerciseCollection: AngularFirestoreCollection<Exercise>;
    private exercisesList$: Observable<Exercise[]>;
    private exercises: Exercise[] = [];
    private exerciseDetail: Exercise;


    constructor(private db: AngularFirestore) {
        this.exerciseCollection = db.collection("/exercise", ref =>
            ref.orderBy("name", "asc")
        );
    }

    getExercisesByMaterial(material_id: string): Observable<any> {
        return  this.db.collection("/exercise", ref => ref.where("material_id", '==', material_id)).get()
            .pipe(
                map(value => {
                    const exerciseArray = [];
                    value.docs.forEach(
                        doc => {
                            const exercise: Exercise = {
                                id: doc.id,
                                title: doc.data().title,
                                description: doc.data().description,
                                type: doc.data().type,
                                material_id: doc.data().material_id,
                            };
                            exerciseArray.push(exercise)
                        }
                    );
                    return exerciseArray;
                })
            );

    };

    addExercise(newExercise) {
        this.exerciseCollection.add(newExercise);
    }

    updateExercise(id: string, name: string) {
        this.exerciseCollection[id].name = name;
    }
}
