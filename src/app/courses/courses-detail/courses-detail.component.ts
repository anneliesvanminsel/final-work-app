import { Component, OnInit } from '@angular/core';
import {Course} from '../../models/course.model';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent implements OnInit {
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
    await this.courseService.getCourseFromDb(this._id);
    this.course = this.courseService.course;
  }

}
