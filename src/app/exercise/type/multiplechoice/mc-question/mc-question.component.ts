import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../models/question.model";
import {AnswerService} from "../../../../services/answer.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-mc-question',
  templateUrl: './mc-question.component.html',
  styleUrls: ['./mc-question.component.scss']
})
export class McQuestionComponent implements OnInit {
  @Input() question: Question;
  answers$: Observable<any>;

  constructor(private answerService: AnswerService) { }

  ngOnInit() {
    this.answers$ = this.answerService.getAnswerByQuestion(this.question.id);
  }

}
