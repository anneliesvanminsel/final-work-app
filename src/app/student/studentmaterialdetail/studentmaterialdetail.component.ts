import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MaterialService} from '../../services/material.service';
import {CourseService} from '../../services/course.service';
import {Material} from '../../models/material.model';
import {Course} from '../../models/course.model';
import {Observable} from 'rxjs';
import {ExerciseService} from '../../services/exercise.service';

@Component({
  selector: 'app-studentmaterialdetail',
  templateUrl: './studentmaterialdetail.component.html',
  styleUrls: ['./studentmaterialdetail.component.scss']
})
export class StudentmaterialdetailComponent implements OnInit {
  private _matid: string;
  courseid: string;
  material: Material;
  course: Course;
  exercises$: Observable<any>;

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
