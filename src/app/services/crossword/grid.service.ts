import { Injectable } from '@angular/core';
import {WordService} from './word.service';
import {MatrixService} from './matrix.service';
import {BlockService} from './block.service';

@Injectable({
    providedIn: 'root'
})

export class GridService {
    private _randomizePuzzlePieace: boolean = true; //randomize the 'spine' words'
    private _randomizeAxis: boolean = true; //randomize the axis of the placement words (down or across)
    private _randomizeAxisList: boolean = true; //randomize the clue lists
    private _crosswordClues = [];

    constructor(
        private wordService: WordService,
        private matrixService: MatrixService,
        private blockService: BlockService,
    ) { }

    findSubBlocks(puzzlewords) {
        let crosswordblocks = [];
        let checkedcrosswords = [];
        let clues = [];

        for(let i = 0; i < puzzlewords.length; i++) {
            let shuffledword = puzzlewords[i];
            let word = shuffledword[0].toLowerCase();
            let clue = shuffledword[1];
            clues[word] = clue;

            this._crosswordClues[word] = clue;

            let checkedcrosswordkey = word + '-' + clue;

            let unmatchedwords = [];

            if(!checkedcrosswords[checkedcrosswordkey]) {
                let wordletters = this.wordService.getLettersHashCountForWord(word);
                let crosswordblock = [];

                for(let j = i + 1; j < puzzlewords.length; j++) {
                    let nextshuffledword = puzzlewords[j];

                    let nextword = nextshuffledword[0].toLowerCase();
                    let nextclue = nextshuffledword[1];
                    let nextcrosswordkey = nextword + '-' + nextclue;

                    if(!checkedcrosswords[nextcrosswordkey]) {
                        let matchingletter = this.wordService.getMatchingLetter(wordletters, nextword);
                        if(matchingletter && matchingletter.length) {
                            wordletters[matchingletter]--;
                            checkedcrosswords[nextcrosswordkey] = true;
                            crosswordblock.push([nextword, matchingletter]);
                        }
                    }
                }

                if(crosswordblock.length) {
                    crosswordblocks[word] = crosswordblock;
                } else {
                    unmatchedwords.push(word);
                }
                checkedcrosswords[checkedcrosswordkey] = true;
            }

            if(unmatchedwords.length) {
                crosswordblocks['(unmatched)'] = unmatchedwords;
            }
        }

        return {
            'blocks':crosswordblocks,
            'clues':clues,
        };
    }

    buildSubBlocks(crosswordblocks) {
        let graphs = [];
        let lastacross = false;

        for (let word in crosswordblocks) {
            if (!crosswordblocks.hasOwnProperty(word) || word == '(unmatched)') continue;

            let subwords = crosswordblocks[word];
            let longestwordlength = this.wordService.getLongestWordLength(subwords);

            let across = true;

            if(this._randomizeAxis) {
                across = Math.random() > 0.5; //generate random axis for the words
            }

            let matrix = [];
            let matrixpositions = [];

            if(across) {
                matrix[longestwordlength - 1] = word;
                matrixpositions[word] = [longestwordlength - 1, 0];

                for(let i = 0; i < subwords.length; i++) {
                    let subwordentry = subwords[i];

                    let subword = subwordentry[0];
                    let subletter = subwordentry[1];

                    let matchingposition = this.matrixService.findMatchingLetterMatrixPosition(matrix, word, subletter, longestwordlength - 2);
                    let matchingoffset = this.wordService.findMatchingOffset(subword, subletter);
                    matrixpositions[subword] = [longestwordlength - matchingoffset - 1, matchingposition];
                    matrix = this.matrixService.setLetterMatrixVertically(matrix, subword, longestwordlength - matchingoffset - 1, matchingposition);
                }
            } else {
                matrix = this.matrixService.fillLetterMatrixVertically(matrix, word, longestwordlength + 1);
                matrixpositions[word] = [0, longestwordlength];

                for(let i = 0; i < subwords.length; i++) {
                    let subwordentry = subwords[i];

                    let subword = subwordentry[0];
                    let subletter = subwordentry[1];
                    let matchingposition = this.matrixService.findMatchingLetterMatrixPositionVertical(matrix, word, subletter, longestwordlength - 1);
                    let matchingoffset = this.wordService.findMatchingOffset(subword, subletter);
                    matrixpositions[subword] = [matchingposition, longestwordlength - matchingoffset];
                    matrix = this.matrixService.setLetterMatrixHorizontally(matrix, subword, matchingposition, longestwordlength - matchingoffset);
                }
            }
            let graph = {
                'matrix':matrix,
                'matrixpositions':matrixpositions,
                'across':across,
                'word':word,
            };

            graphs.push(graph);
        }

        if(crosswordblocks['(unmatched)']) {
            let graph = this.matrixService.buildUnassignedCrosswordBlock(crosswordblocks['(unmatched)']);
            graphs.push(graph);
        }

        console.log(graphs);
        return graphs;

    }

    //Compact the graphs that will be used to make the full crossword puzzle graph.
    compactCrosswordBlockSources(graphs) {
        for(let i = 0; i < graphs.length; i++) {
            let graph = graphs[i];

            let matrix = graph['matrix'];

            graph = this.blockService.compactCrosswordBlockSource(graph);

            graphs[i] = graph;
        }
        return graphs;
    }







}
