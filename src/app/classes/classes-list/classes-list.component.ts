import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {ClassgroupService} from "../../services/classgroup.service";

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
  providers: ClassgroupService,
})
export class ClassesListComponent implements OnInit {

  public classgroups: {name: string, year: string}[] = [];
  faPlus = faPlus;

  constructor(private classgroupService: ClassgroupService){

  }

  ngOnInit() {
    this.classgroups = this.classgroupService.classgroupCollection;
  }
}
