import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from "../../../services/question.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-multiplechoice',
  templateUrl: './multiplechoice.component.html',
  styleUrls: ['./multiplechoice.component.scss']
})
export class MultiplechoiceComponent implements OnInit {
  @Input() exercise_id: string;
  questions$: Observable<any>;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questions$ = this.questionService.getQuestionByExercise(this.exercise_id);
  }

}
