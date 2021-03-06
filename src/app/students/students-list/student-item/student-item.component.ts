import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../../models/student.model';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent implements OnInit {
  @Input() student: Student;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
