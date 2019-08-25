import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionService} from '../../../services/question.service';
import {AnswerService} from '../../../services/answer.service';
import {AuthService} from '../../../services/auth.service';
import {CrosswordService} from '../../../services/crossword.service';
import {MatrixService} from '../../../services/crossword/matrix.service';
import {ClueService} from "../../../services/crossword/clue.service";
/*
    The code written in this component is based on the JQuery-code of 'HoldOffHunger' as seen on Github.
    link: https://github.com/HoldOffHunger/jquery-crossword-puzzle-generator/blob/master/javascript/crossword-puzzle.js
 */
@Component({
    selector: 'app-crossword',
    templateUrl: './crossword.component.html',
    styleUrls: ['./crossword.component.scss']
})
export class CrosswordComponent implements OnInit {
    @Input() exercise_id: string;
    private questions$: Observable<any>;
    private _wordList = [];
    private _answerList = [];
    private _questionList = [];
    private _widestLine;
    private _tallestLine;
    
    numbersTall = [];
    numbersWide = [];
    matrix;
    
    clueListAcross = [];
    clueListDown = [];


    constructor(
        private questionService: QuestionService,
        private answerService: AnswerService,
        private authService: AuthService,
        private crosswordService: CrosswordService,
        private matrixService: MatrixService,
        private clueService: ClueService
    ) { }

    ngOnInit() {
        this.questions$ = this.questionService.getQuestionByExercise(this.exercise_id);
        this.generateWordList();
        console.log(this._answerList, this._questionList);

        if(this._answerList.length == this._questionList.length) {
            this.crosswordService.createCrosswordPuzzle(this._wordList);

            if(this.crosswordService.fullGraph){
                this.matrix = this.crosswordService.fullGraph;
                console.log(this.matrix);
                this._widestLine = this.matrixService.getWidestLine(this.matrix);
                this._tallestLine = this.matrixService.getTallestLine(this.matrix);
                this.numbersTall = Array(this._tallestLine).fill('tall');
                this.numbersWide = Array(this._widestLine).fill('wide');
                this.clueListDown = this.clueService.downClues;
                this.clueListDown = this.clueService.acrossClues;
            }
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
