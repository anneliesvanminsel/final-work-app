import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import { Classgroup} from '../models/classgroup.model';
import {Account} from '../models/account';

@Injectable()
export class ClassgroupService {
    classgroupCollection: AngularFirestoreCollection<Classgroup>;
    classgroups: Observable<Classgroup[]>;
    classgroupDoc: AngularFirestoreDocument<Classgroup>;

    constructor(private db: AngularFirestore) {
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

    addClassgroup(newClassgroup) {
        this.classgroupCollection.add(newClassgroup);
    }

    updateClassgroup(id: string, name: string) {
        this.classgroupCollection[id].name = name;
    }

    getClassgroupFromDb(id: string) {
        this.db.collection("classgroup", ref => ref.where("doc.id", '==', id)).get().subscribe((querySnapshot) => {
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
            });
        });
    }
}
