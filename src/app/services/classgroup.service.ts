import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import { Classgroup} from '../models/classgroup.model';

@Injectable()
export class ClassgroupService {
    classgroupCollection: AngularFirestoreCollection<Classgroup>;
    classgroups: Observable<Classgroup[]>;
    classgrouDoc: AngularFirestoreDocument<Classgroup>;

    constructor(db: AngularFirestore) {
        //this.classgroups = db.collection('/classgroup').valueChanges();

        this.classgroupCollection = db.collection("/classgroup", ref =>
            ref.orderBy("name", "asc")
        );

        this.classgroups = this.classgroupCollection.snapshotChanges().pipe(
            map(actions =>
                actions.map(a => {
                    const data = a.payload.doc.data() as Classgroup;
                    data.id = a.payload.doc.id;
                    return data;
                })
            )
        );
    }

    getClassgroups() {
        return this.classgroups;
    }

    addClassgroup(name: string, date: string) {
        const newClassgroup = new Classgroup(name, date);
        this.classgroupCollection.add(newClassgroup);
    }

    updateClassgroup(id: string, name: string) {
        this.classgroupCollection[id].name = name;
    }
}
