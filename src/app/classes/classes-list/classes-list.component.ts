import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import { AngularFirestore } from 'angularfire2/firestore';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {

  public classgroups: Observable<any[]>;
  faPlus = faPlus;

  constructor(db: AngularFirestore) {
    this.classgroups = db.collection('/classgroup').valueChanges();
  }

  ngOnInit() {

  }
}
