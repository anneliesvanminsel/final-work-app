import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {GridService} from './crossword/grid.service';
import {ClueService} from './crossword/clue.service';
import {MatrixService} from './crossword/matrix.service';

@Injectable()
export class CrosswordService {
    private _teacherMode: boolean = this.authService.isTeacher; //Show answers in grid
    private _randomizeWords: boolean = true; //randomize the puzzlewords
    private _randomizePuzzlePieace: boolean = true; //randomize the 'spine' words'
    private _randomizeAxis: boolean = true; //randomize the axis of the placement words (down or across)
    private _randomizeAxisList: boolean = true; //randomize the clue lists
    private _fullGraph;
    private _wordLists;

    private _tableRow: string = '';

    constructor(
        private authService: AuthService,
        private gridService: GridService,
        private clueService: ClueService,
        private matrixService: MatrixService
    ) { }

    //Generating the crossword
    createCrosswordPuzzle(puzzlewords){
        let newPuzzlewords = [];
        let newGraphs= [];
        let wordcount = puzzlewords.length;

        if(!puzzlewords || !wordcount) {
            console.log("Developer Error : Did you forget to load words?");
            return false;
        }

        if(this._randomizeWords) {
            newPuzzlewords = this.shuffle(puzzlewords); //appears to do nothing..
        }

        let crosswords = this.gridService.findSubBlocks(newPuzzlewords);
        let crosswordblocks = crosswords['blocks'];
        let crosswordclues = crosswords['clues'];
        let graphs = this.gridService.buildSubBlocks(crosswordblocks);

        graphs = this.gridService.compactCrosswordBlockSources(graphs);

        if(this._randomizePuzzlePieace) {
              newGraphs = this.shuffle(graphs);
        }

        if(!newGraphs || !newGraphs.length) {
              console.log("Developer Error : Your words could not be made into graphs.");
              return false;
        }

        let fullGraph = this.gridService.buildCrosswordBlockGraphs(graphs);
        this._fullGraph = fullGraph['matrix'];
        console.log(fullGraph);
        console.log(fullGraph['matrixpositions']);
        this._wordLists = this.clueService.buildCrosswordLists(fullGraph['matrixpositions']);
        console.log(this._wordLists);

        //this.clueService.showCrossWordLists(wordlists, crosswordclues);
        return true;
    }

    //shuffle the words
    shuffle(array): [] {
        let current = array.length, temporaryValue, randomIndex;

        while (current) {
            randomIndex = Math.floor(Math.random() * current);
            current -= 1;

            temporaryValue = array[current];
            array[current] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    get fullGraph() {
        return this._fullGraph;
    }
/*
    showCrossWordPuzzle(matrix) {
        let widestline = this.matrixService.getWidestLine(matrix);
        let tallestline = this.matrixService.getTallestLine(matrix);

        let table = $('<table class="puzzle" border="1" cellpadding="0" cellspacing="0"></table>');

        for(let i = 0; i < tallestline; i++) {
            let tablerow = '<tr class="letter-row">';

            for(let j = 0; j < widestline; j++) {
                let cellclass = 'letter-cell';

                if(!matrix[i][j] || matrix[i][j] == ' ') {
                    cellclass += ' blank-cell';

                }
                tablerow += '<td id="cell-position-' + i + '-' + j + '" class="relative-position ' + cellclass + '">';

                tablerow += '<span class="letter-text" id="letter-position-' + i + '-' + j + '">';

                if(this._teacherMode && matrix[i][j] && matrix[i][j] != ' ') {
                    tablerow += matrix[i][j];
                }

                tablerow += '</span>';

                tablerow += '</td>';
            }

            tablerow += '</tr>';
            this._tableRow = tablerow;
            $(table).append(tablerow);
        }

        $('#root').append(table);

        return true;
    }
    */
}
