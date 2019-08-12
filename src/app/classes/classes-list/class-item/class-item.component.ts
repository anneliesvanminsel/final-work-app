import { Component, OnInit, Input } from '@angular/core';
import { Classgroup } from '../../../models/classgroup.model';
import {ClassgroupService} from '../../../services/classgroup.service';
import {StudentTeacherService} from '../../../services/student-teacher.service';
import {Student} from '../../../models/student.model';

@Component({
  selector: 'app-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.scss']
})
export class ClassItemComponent implements OnInit {
  @Input() classgroup: Classgroup;
  students: Student[];
  numberOfStudents: number = 0;

  constructor(private classgroupService: ClassgroupService, private studenteachterService: StudentTeacherService) { }

  ngOnInit() {
    this.setNumberOfStudents();
  }

  async setNumberOfStudents() {
    this.students = new Array();
    await this.studenteachterService.getStudentsByClass(this.classgroup.id);
    this.students = await this.studenteachterService.getStudents();
    console.log(this.classgroup.name, this.students);
    this.numberOfStudents = this.students.length;
  }
}
