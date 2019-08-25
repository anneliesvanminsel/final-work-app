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
  private _id: string;
  link: string ="/teacher/courses/addmaterial/";
  course: Course;

  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this._id = params.get("courseid")
    });
    this.link += this._id;
    this.setCourse();
  }

  async setCourse() {
    console.log(this._id);
    await this.courseService.getCourseFromDb(this._id);
    this.course = this.courseService.course;
  }
}
