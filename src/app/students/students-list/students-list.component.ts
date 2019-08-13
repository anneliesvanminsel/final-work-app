import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentTeacherService } from "../../services/student-teacher.service";
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  private _classid: string;
  students$: Observable<Student[]>;

  constructor(private studentTeacherService: StudentTeacherService, private route: ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      this._classid = params.get("classid")
    });
  }

  ngOnInit() {
    this.students$ = this.studentTeacherService.getStudentsByClass(this._classid);
  }

}
