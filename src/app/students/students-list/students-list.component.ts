import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentTeacherService } from "../../services/student-teacher.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  private classId: string;
  students: Student[] = [];

  constructor(private studentTeacherService: StudentTeacherService, private route: ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      this.classId = params.get("id")
    });
  }

  ngOnInit() {
    this.setStudents();
  }

  async setStudents() {
    await this.studentTeacherService.getStudentsByClass(this.classId);

    this.students = this.studentTeacherService.getStudents();
    console.log(this.students);
  }

}
