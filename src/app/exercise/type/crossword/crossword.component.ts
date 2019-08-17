import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionService} from '../../../services/question.service';
import {AnswerService} from '../../../services/answer.service';

@Component({
    selector: 'app-crossword',
    templateUrl: './crossword.component.html',
})
export class CrosswordComponent implements OnInit {
    @Input() exercise_id: string;
    private questions$: Observable<any>;
    private answers$: Observable<any>;
    private _wordList: [];

    constructor(private _questionService: QuestionService, private _answerService: AnswerService) { }

    ngOnInit() {
        this.questions$ = this._questionService.getQuestionByExercise(this.exercise_id);
        this.generateWordList();
    }

    generateWordList() {
        this.questions$.subscribe( value => {
                for(let i=0; i < value.length; i++ ) {
                    let newWordClue: string[] = [];
                    console.log(value[i]);
                    this.answers$ = this._answerService.getAnswerByQuestion(value[i].id);

                    this.answers$.subscribe( answerList => {
                        for(let j=0; j < answerList.length; j++ ) {
                            console.log(answerList[j]);
                            newWordClue.push(answerList[j].label);
                        }
                    });
                    newWordClue.push(value[i].title);
                    console.log(newWordClue);
                }
            }
        );
    }

}
