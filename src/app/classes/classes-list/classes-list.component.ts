import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Classgroup } from '../../models/classgroup.model';
import {ClassgroupService} from "../../services/classgroup.service";

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
})
export class ClassesListComponent implements OnInit {

  classgroup: Classgroup[];
  faPlus = faPlus;

  constructor(private classgroupService: ClassgroupService){

  }

  ngOnInit() {
    this.classgroups[] = this.classgroupService.getClassgroups();
  }
}
