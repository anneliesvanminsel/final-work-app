import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from 'RxJS';
import { Classgroup} from '../models/classgroup.model';

export class ClassgroupService {
    classgroupCollection: AngularFirestoreCollection<Classgroup>;
    public classgroups: Observable<Classgroup[]>;

    constructor(db: AngularFirestore) {
        this.classgroupCollection = db.collection('/classgroup').valueChanges();
    }

    addClassgroup(name: string, date: string) {
        const newClassgroup = new Classgroup(name, date);
        this.classgroups.push(newClassgroup);
    }

    updateClassgroup(id: string, name: string) {
        this.classgroups[id].name = name;
    }
}
