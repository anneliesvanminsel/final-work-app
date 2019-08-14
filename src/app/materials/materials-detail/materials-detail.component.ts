import { Component, OnInit } from '@angular/core';
import { Material } from '../../models/material.model';
import {ActivatedRoute} from '@angular/router';
import {MaterialService} from '../../services/material.service';
import {CourseService} from '../../services/course.service';
import {Course} from '../../models/course.model';

@Component({
  selector: 'app-materials-detail',
  templateUrl: './materials-detail.component.html',
  styleUrls: ['./materials-detail.component.scss']
})

export class MaterialsDetailComponent implements OnInit {
  private _matid: string;
  private _courseid: string;
  private _material: Material;
  private _course: Course;

  constructor(private route: ActivatedRoute, private materialService: MaterialService, private courseService: CourseService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this._matid = params.get("materialid");
      this._courseid = params.get("courseid");
    });
    this.setCourse();
    this.setMaterial();
  }

  async setCourse() {
    await this.courseService.getCourseFromDb(this._courseid);
    this._course = this.courseService.course;
  }

  async setMaterial() {
    await this.materialService.getMaterialFromDb(this._matid);
    this._material = this.materialService.material;
  }
}
