import {Component, Input, OnInit} from '@angular/core';
import {TeacherAnswer} from "../../../../models/teacheranswer.model";

@Component({
  selector: 'app-mc-answer',
  templateUrl: './mc-answer.component.html',
  styleUrls: ['./mc-answer.component.scss']
})
export class McAnswerComponent implements OnInit {
  @Input() answer: TeacherAnswer;

  constructor() { }

  ngOnInit() {
  }

}
