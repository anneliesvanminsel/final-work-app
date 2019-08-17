import { Component, OnInit } from '@angular/core';
import {Course} from '../../models/course.model';
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  providers: [CourseService],
})
export class CoursesListComponent implements OnInit {
  courses: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

}
