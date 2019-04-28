import { Component, OnInit } from '@angular/core';
import {CourseService} from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CourseService],
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
