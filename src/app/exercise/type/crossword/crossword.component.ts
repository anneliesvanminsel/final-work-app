import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionService} from '../../../services/question.service';
import {AnswerService} from '../../../services/answer.service';
import {AuthService} from '../../../services/auth.service';
import {CrosswordService} from '../../../services/crossword.service';
/*
    The code written in this component is based on the JQuery-code of 'HoldOffHunger' as seen on Github.
    link: https://github.com/HoldOffHunger/jquery-crossword-puzzle-generator/blob/master/javascript/crossword-puzzle.js
 */
@Component({
    selector: 'app-crossword',
    templateUrl: './crossword.component.html',
})
export class CrosswordComponent implements OnInit {
    @Input() exercise_id: string;
    private questions$: Observable<any>;
    private _wordList = [];
    private _answerList = [];
    private _questionList = [];

    constructor(
        private questionService: QuestionService,
        private answerService: AnswerService,
        private authService: AuthService,
        private crosswordService: CrosswordService
    ) { }

    ngOnInit() {
        this.questions$ = this.questionService.getQuestionByExercise(this.exercise_id);
        this.generateWordList();
        console.log(this._answerList, this._questionList);
        if(this._answerList.length == this._questionList.length) {
            this.crosswordService.createCrosswordPuzzle(this._wordList);
        }
    }

    //We are creating the list of words with the question and answers that are stored in the database
    generateWordList() {
        this.questions$.subscribe( value => {
                for(let i=0; i < value.length; i++ ) {
                    let newWordClue = [];
                    this._questionList.push(value[i].title);

                    this.answerService.getAnswerByQuestion(value[i].id).subscribe( answerList => {
                        newWordClue.push(answerList[0].label);
                        newWordClue.push(value[i].title);
                        this._answerList.push(answerList[0].label);

                        this._wordList.push(newWordClue);
                        if(this._answerList.length == this._questionList.length) {
                            console.log('je kan nu een kruiswoordraadsel maken');
                            this.crosswordService.createCrosswordPuzzle(this._wordList);
                        }
                    });
                }
            }
        );
    }







}
