import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {GridService} from './crossword/grid.service';

@Injectable()
export class CrosswordsService {
    private _teacherMode: boolean = this.authService.isTeacher; //Show answers in grid
    private _randomizeWords: boolean = true; //randomize the puzzlewords
    private _randomizePuzzlePieace: boolean = true; //randomize the 'spine' words'
    private _randomizeAxis: boolean = true; //randomize the axis of the placement words (down or across)
    private _randomizeAxisList: boolean = true; //randomize the clue lists

    constructor(
        private authService: AuthService,
        private gridService: GridService,
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
        console.log('changed', graphs);

          if(this._randomizePuzzlePieace) {
              newGraphs = this.shuffle(graphs);
          }

          if(!newGraphs || !newGraphs.length) {
              console.log("Developer Error : Your words could not be made into graphs.");
              return false;
          }
        /*
                      var fullgraph = this.buildCrosswordBlockGraphs(graphs);
                      var wordlists = this.buildCrosswordLists(fullgraph['matrixpositions']);

                      this.showCrossWordPuzzle(fullgraph['matrix']);
                      this.showCrossWordLists(wordlists, crosswordclues);
                      this.showCrossWordOptions();

                      return true;
                      */
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
}
