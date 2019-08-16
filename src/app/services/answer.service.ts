import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import { TeacherAnswer} from "../models/teacheranswer.model";

@Injectable()
export class AnswerService {
    private answerCollection: AngularFirestoreCollection<TeacherAnswer>;


    constructor(private db: AngularFirestore) {
        this.answerCollection = db.collection("/answer", ref =>
            ref.orderBy("name", "asc")
        );
    }

    getAnswerByQuestion(question_id: string): Observable<any> {
        return  this.db.collection("/answer", ref => ref.where("question_id", '==', question_id)).get()
            .pipe(
                map(value => {
                    const answerArray = [];
                    value.docs.forEach(
                        doc => {
                            const answer: TeacherAnswer = {
                                id: doc.id,
                                label: doc.data().label,
                                rightanswer: doc.data().rightanswer,
                                question_id: doc.data().question_id
                            };
                            answerArray.push(answer)
                        }
                    );
                    return answerArray;
                })
            );

    };
}
