import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course.model";

@Component({
  selector: 'app-studentcoursedetail',
  templateUrl: './studentcoursedetail.component.html',
  styleUrls: ['./studentcoursedetail.component.scss']
})
export class StudentcoursedetailComponent implements OnInit {
  private id: string;
  link: string ="/teacher/courses/addmaterial/";
  course: Course;

  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("courseid")
    });
    this.link += this.id;
    this.setCourse();
  }

  async setCourse() {
    console.log(this.id);
    await this.courseService.getCourseFromDb(this.id);
    this.course = this.courseService.course;
  }
}
