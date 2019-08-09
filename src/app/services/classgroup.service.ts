import { EventEmitter, Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { map } from "rxjs/operators";
import { Classgroup} from '../models/classgroup.model';
import {Account} from '../models/account';
import {User} from 'firebase';

@Injectable()
export class ClassgroupService {
    private classgroupCollection: AngularFirestoreCollection<Classgroup>;
    private classgroups: Observable<Classgroup[]>;
    private classgroupDoc: AngularFirestoreDocument<Classgroup>;
    private classDetail: Classgroup;

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

    async getClassgroupFromDb(id: string) {

        await this.classgroupCollection.doc(id).ref.get().then((doc) => {
            if (doc.exists) {
                this.classDetail = <Classgroup> doc.data();
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    get class() : Classgroup {
        return this.classDetail;
    }
}
