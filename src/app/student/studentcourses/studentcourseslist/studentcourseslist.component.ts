import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course.model";

@Component({
  selector: 'app-studentcourseslist',
  templateUrl: './studentcourseslist.component.html',
  styleUrls: ['./studentcourseslist.component.scss']
})
export class StudentcourseslistComponent implements OnInit {
  courses: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      console.log(courses);
      this.courses = courses;
    });
  }

}
