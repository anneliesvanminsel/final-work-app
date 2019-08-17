import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-crossword',
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.css']
})
export class CrosswordComponent implements OnInit {
  @Input() exercise_id: string;
  private questions$: Observable<any>;
  private _wordList: [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questions$ = this.questionService.getQuestionByExercise(this.exercise_id);
    this.generateWordList();
  }

  generateWordList() {
    this.questions$.subscribe( value => {
          for(let i=0; i < value.length; i++ ) {
              console.log(value);
          }
    }

    );

  }

}
