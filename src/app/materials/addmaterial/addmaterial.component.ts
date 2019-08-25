import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../models/course.model';
import {CourseService} from '../../services/course.service';
import {Material} from '../../models/material.model';
import {NgForm} from '@angular/forms';
import {MaterialService} from '../../services/material.service';

@Component({
  selector: 'app-addmaterial',
  templateUrl: './addmaterial.component.html',
  styleUrls: ['./addmaterial.component.scss']
})
export class AddmaterialComponent implements OnInit {
  private id: string;
  course: Course;
  link: string ="/teacher/courses/detail/";

  newMaterial: Material = {
    id: '',
    title: '',
    description: '',
    course_id: '',
    theme_id: '',
    date: ''
  };

  constructor(
      private courseService: CourseService,
      private route: ActivatedRoute,
      private materialService: MaterialService,
      private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("courseid")
    });
    this.link += this.id;
    this.setCourse();
  }

  async setCourse() {
    await this.courseService.getCourseFromDb(this.id);
    this.course = this.courseService.course;
  }

  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }

    this.newMaterial.title =  form.value.title;
    this.newMaterial.course_id =  this.id;
    this.newMaterial.description = form.value.description;

    this.materialService.addMaterial(this.newMaterial);

    form.reset();
    this.router.navigate([this.link]);
  }
}
