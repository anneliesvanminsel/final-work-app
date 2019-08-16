import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import { Question } from "../models/question.model";

@Injectable()
export class QuestionService {
    private questionCollection: AngularFirestoreCollection<Question>;


    constructor(private db: AngularFirestore) {
        this.questionCollection = db.collection("/question", ref =>
            ref.orderBy("name", "asc")
        );
    }

    getQuestionByExercise(exercise_id: string): Observable<any> {
        return  this.db.collection("/question", ref => ref.where("exercise_id", '==', exercise_id)).get()
            .pipe(
                map(value => {
                    const questionArray = [];
                    value.docs.forEach(
                        doc => {
                            const question: Question = {
                                id: doc.id,
                                title: doc.data().title,
                                description: doc.data().description,
                                exercise_id: doc.data().exercise_id,
                            };
                            questionArray.push(question)
                        }
                    );
                    return questionArray;
                })
            );

    };
}
