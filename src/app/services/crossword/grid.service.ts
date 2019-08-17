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
        private blockService: BlockService
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

    /* buildCrosswordBlockGraphs(graphs)

		Given groups of words, each with a "spine" word, assemble these into a single crossword puzzle block graph.

	*/

    buildCrosswordBlockGraphs(graphs) {
        let firstgraph = graphs.shift();

        let fullmatrix = firstgraph['matrix'];
        let fullmatrixpositions = [{
            'matrixpositions':firstgraph['matrixpositions'],
            'across':firstgraph['across'],
            'word':firstgraph['word'],
        }];

        for(let i = 0; i < graphs.length; i++) {
            let graph = graphs[i];

            let matrix = graph['matrix'];
            let matrixpositions = graph['matrixpositions'];
            let across = graph['across'];
            let word = graph['word'];

            console.log("BT: BUILD BLOCK GRAPH...|" + i + "|" + word + "|");

            let widestline = this.matrixService.getWidestLine(fullmatrix);
            let tallestline = this.matrixService.getTallestLine(fullmatrix);

            let buildvertically = this.matrixService.checkToBuildVertically(fullmatrix, matrix, widestline, tallestline);
            let built = false;

            if(!buildvertically) {
                // I AM LEAF!!!
                let possiblefullmatrixsolution = false;
                let possiblefullmatrixcoordinates = [];
                let shortestlinelength = 99999999;

                for(let j = 0; j < fullmatrix.length; j++) {
                    if(fullmatrix[j]) {
                        let trimmedfullmatrixline = fullmatrix[j].trim();
                        if(trimmedfullmatrixline.length > 0 && trimmedfullmatrixline.length < shortestlinelength) {
                            let solutioncoordinates = [trimmedfullmatrixline.length,j + i];
                            let newerpossiblefullmatrixsolution = this.matrixService.joinHorizontalMatrices(fullmatrix, matrix, solutioncoordinates);
                            if(newerpossiblefullmatrixsolution) {
                                shortestlinelength = this.matrixService.getThinnestLine(newerpossiblefullmatrixsolution);
                                possiblefullmatrixsolution = newerpossiblefullmatrixsolution;
                                possiblefullmatrixcoordinates = solutioncoordinates;

                                let canmutate: boolean = true;
                                let leftpushback = 1;

                                while(canmutate && (trimmedfullmatrixline.length - leftpushback) >= 0) {
                                    console.log("BT: Across ALPHA.");
                                    solutioncoordinates = [trimmedfullmatrixline.length - leftpushback,j + i];
                                    let newestpossiblefullmatrixsolution = this.matrixService.joinHorizontalMatrices(fullmatrix, matrix, solutioncoordinates);
                                    if(newestpossiblefullmatrixsolution) {
                                        shortestlinelength = this.matrixService.getThinnestLine(newestpossiblefullmatrixsolution);
                                        possiblefullmatrixsolution = newestpossiblefullmatrixsolution;
                                        possiblefullmatrixcoordinates = solutioncoordinates;
                                        leftpushback++;
                                    } else {
                                        canmutate = false;
                                        leftpushback--;
                                    }
                                }

                                let toppushback = 1;

                                while((j + i) - toppushback > 0) {
                                    solutioncoordinates = [trimmedfullmatrixline.length - leftpushback,(j + i) - toppushback];
                                    let newestpossiblefullmatrixsolution = this.matrixService.joinHorizontalMatrices(fullmatrix, matrix, solutioncoordinates);
                                    if(newestpossiblefullmatrixsolution) {
                                        shortestlinelength = this.matrixService.getThinnestLine(newestpossiblefullmatrixsolution);
                                        possiblefullmatrixsolution = newestpossiblefullmatrixsolution;
                                        possiblefullmatrixcoordinates = solutioncoordinates;
                                    }

                                    toppushback++;
                                }

                                toppushback--;

                                canmutate = true;
                                leftpushback = 1;

                                while(canmutate && (trimmedfullmatrixline.length - leftpushback) >= 0) {
                                    solutioncoordinates = [trimmedfullmatrixline.length - leftpushback,j + i - toppushback];
                                    let newestpossiblefullmatrixsolution = this.matrixService.joinHorizontalMatrices(fullmatrix, matrix, solutioncoordinates);
                                    if(newestpossiblefullmatrixsolution) {
                                        shortestlinelength = this.matrixService.getThinnestLine(newestpossiblefullmatrixsolution);
                                        possiblefullmatrixsolution = newestpossiblefullmatrixsolution;
                                        possiblefullmatrixcoordinates = solutioncoordinates;
                                        leftpushback++;
                                    } else {
                                        canmutate = false;
                                        leftpushback--;
                                    }
                                }
                            }
                        }
                    }
                }

                if(possiblefullmatrixsolution) {
                    fullmatrix = possiblefullmatrixsolution;
                    matrixpositions = this.matrixService.interpolateMatrixPositions(matrixpositions, [possiblefullmatrixcoordinates[1], possiblefullmatrixcoordinates[0]], word);
                    fullmatrixpositions.push({
                        'matrixpositions':matrixpositions,
                        'across':across,
                        'word':word,
                    });
                    built = true;
                }
            }

            if(buildvertically || !built) {
                console.log("BT: Vertical ALPHA.");
                // AND I AM TWIG!!!
                let oldlength = fullmatrix.length;
                let fullmatrixbottom = fullmatrix[fullmatrix.length - 1];
                for(let j = 0; j < widestline; j++) {
                    let smallmatrixtop = matrix[0];
                    if(this.matrixService.nonConflictingRows(fullmatrixbottom, smallmatrixtop)) {
                        fullmatrix = this.matrixService.joinVerticalMatrices(fullmatrix, matrix);
                        let solutioncoordinates = [oldlength, j];
                        matrixpositions = this.matrixService.interpolateMatrixPositions(matrixpositions, solutioncoordinates, word);
                        fullmatrixpositions.push({
                            'matrixpositions':matrixpositions,
                            'across':across,
                            'word':word,
                        });
                        j = widestline;
                        built = true;
                    } else {
                        matrix = this.matrixService.incrementMatrixHorizontally(matrix);
                    }
                }

                if(!built) {
                    this.viewPuzzle(matrix);

                    let solutioncoordinates = [fullmatrix.length + 1, 0];
                    matrix = this.blockService.compactCrosswordBlockSource({'matrix':matrix})['matrix'];
                    fullmatrix.push('');
                    fullmatrix = this.matrixService.joinVerticalMatrices(fullmatrix, matrix);

                    matrixpositions = this.matrixService.interpolateMatrixPositions(matrixpositions, solutioncoordinates, word);

                    fullmatrixpositions.push({
                        'matrixpositions':matrixpositions,
                        'across':across,
                        'word':word,
                    });
                }
            }

            fullmatrix = this.blockService.compactCrosswordBlockSource({'matrix':fullmatrix})['matrix'];
        }

        let fullgraph = {
            'matrix':fullmatrix,
            'matrixpositions':fullmatrixpositions,
        };

        return fullgraph;
    }

    //Debugging tool to view the puzzle.
    viewPuzzle(puzzle) {
        console.log("Viewing puzzle from...|" + arguments + "|");
        console.info(JSON.stringify(puzzle).replace(/,/g, ",\n"));
    }
}
