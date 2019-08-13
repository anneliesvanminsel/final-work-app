import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import { Material} from '../models/material.model';

@Injectable()
export class MaterialService {
    private materialCollection: AngularFirestoreCollection<Material>;
    private materialsList$: Observable<Material[]>;
    private materials: Material[] = [];


    constructor(private db: AngularFirestore) {
        this.materialCollection = db.collection("/material", ref =>
            ref.orderBy("name", "asc")
        );
    }

    getMaterialsByCourse(course_id: string): Observable<any> {
        return  this.db.collection("/material", ref => ref.where("course_id", '==', course_id)).get()
            .pipe(
                map(value => {
                    const materialArray = [];
                    value.docs.forEach(
                        doc => {
                            const material: Material = {
                                id: doc.id,
                                title: doc.data().title,
                                description: doc.data().description,
                                date: doc.data().date,
                                course_id: doc.data().course_id,
                                theme_id: doc.data().theme_id,
                            };
                            materialArray.push(material)
                        }
                    );
                    return materialArray;
                })
            );

    };

    addMaterial(newMaterial) {
        this.materialCollection.add(newMaterial);
    }

    updateMaterial(id: string, name: string) {
        this.materialCollection[id].name = name;
    }
}
