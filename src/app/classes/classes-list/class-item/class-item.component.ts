import { Component, OnInit, Input } from '@angular/core';
import { Classgroup } from '../../../models/classgroup.model';
import {ClassgroupService} from '../../../services/classgroup.service';
import {StudentTeacherService} from '../../../services/student-teacher.service';

@Component({
  selector: 'app-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.scss']
})
export class ClassItemComponent implements OnInit {
  @Input() classgroup: Classgroup;

  numberOfStudents: number;

  constructor(private classgroupService: ClassgroupService, private studenteachterService: StudentTeacherService) { }

  ngOnInit() {
    this.setNumberOfStudents();
    console.log('itemmm');
  }

  setNumberOfStudents() {
    this.studenteachterService.getStudentsByClass(this.classgroup.id);
    this.numberOfStudents = this.studenteachterService.getStudents().length;
    console.log(this.studenteachterService.getStudents());
  }



}
