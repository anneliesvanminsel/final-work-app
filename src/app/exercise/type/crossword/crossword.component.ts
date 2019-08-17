import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionService} from '../../../services/question.service';
import {AnswerService} from '../../../services/answer.service';
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

    private _teacherMode: boolean = true; //Show answers in grid
    private _randomizeWords: boolean = true; //randomize the puzzlewords
    private _randomizePuzzlePieace: boolean = true; //randomize the 'spine' words'
    private _randomizeAxis: boolean = true; //randomize the axis of the placement words (down or across)
    private _randomizeAxisList: boolean = true; //randomize the clue lists



    constructor(private questionService: QuestionService, private answerService: AnswerService) { }

    ngOnInit() {
        this.questions$ = this.questionService.getQuestionByExercise(this.exercise_id);
        this.makeCrossword();
    }

    async makeCrossword(){
        await this.generateWordList();
        this.createCrosswordPuzzle(this._wordList);
    }

    //We are creating the list of words with the question and answers that are stored in the database
    generateWordList() {
        this.questions$.subscribe( value => {
                for(let i=0; i < value.length; i++ ) {
                    let newWordClue = [];

                    this.answerService.getAnswerByQuestion(value[i].id).subscribe( answerList => {
                        newWordClue.push(answerList[0].label);
                        newWordClue.push(value[i].title);
                        this._wordList.push(newWordClue);
                    });
                }
            }
        );
    }

    //Displaying the crossword

    createCrosswordPuzzle(puzzlewords){
        console.log(puzzlewords);
        let wordcount = puzzlewords.length;

        if(!puzzlewords || !wordcount) {
            console.log("Developer Error : Did you forget to load words?");
            return false;
        }

        if(this._randomizeWords) {
            puzzlewords = this.shuffle(puzzlewords);
            console.log(puzzlewords);
        }

    }

    //shuffle the words
    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

}
