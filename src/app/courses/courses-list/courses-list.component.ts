import { Component, OnInit } from '@angular/core';
import {Course} from '../../models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [
    new Course(1,'Wiskunde', '10/1/2019'),
    new Course(2, 'Aardrijkskunde', '30/12/2018'),
    new Course(3,'Natuurwetenschappen', '25/12/2018'),
    new Course(4, 'Biologie', '10/1/2019'),
    new Course(5, 'Nederlands', '30/12/2018')
  ];
  constructor() { }

  ngOnInit() {
  }

}
