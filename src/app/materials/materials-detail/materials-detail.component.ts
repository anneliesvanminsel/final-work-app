import { Component, OnInit } from '@angular/core';
import { Material } from '../../models/material.model';
import {ActivatedRoute} from '@angular/router';
import {MaterialService} from '../../services/material.service';
import {CourseService} from '../../services/course.service';
import {Course} from '../../models/course.model';
import {Exercise} from '../../models/exercise.model';
import {ExerciseService} from '../../services/exercise.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-materials-detail',
  templateUrl: './materials-detail.component.html',
  styleUrls: ['./materials-detail.component.scss']
})

export class MaterialsDetailComponent implements OnInit {
  private _matid: string;
  courseid: string;
  material: Material;
  course: Course;
  exercises$: Observable<any>;
  link: string = '/teacher/courses/material/addexercise/';

  constructor(
      private route: ActivatedRoute,
      private materialService: MaterialService,
      private courseService: CourseService,
      private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this._matid = params.get("materialid");
      this.courseid = params.get("courseid");
    });
    this.setCourse();
    this.setMaterial();
    this.exercises$ = this.exerciseService.getExercisesByMaterial(this._matid);
    this.link += this.courseid + '/' + this._matid;
  }

  async setCourse() {
    await this.courseService.getCourseFromDb(this.courseid);
    this.course = this.courseService.course;
  }

  async setMaterial() {
    await this.materialService.getMaterialFromDb(this._matid);
    this.material = this.materialService.material;
  }
}
