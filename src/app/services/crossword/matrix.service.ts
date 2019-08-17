import { Injectable } from '@angular/core';
import {WordService} from './word.service';

@Injectable({
    providedIn: 'root'
})

export class MatrixService {
    private _randomizePuzzlePieace: boolean = true; //randomize the 'spine' words'
    private _randomizeAxis: boolean = true; //randomize the axis of the placement words (down or across)
    private _randomizeAxisList: boolean = true; //randomize the clue lists
    private _crosswordClues = [];

    constructor(
        private wordService: WordService,
    ) { }

    //Find the horizontal position of a letter
    findMatchingLetterMatrixPosition(matrix, word, subletter, index) {
        for(let i = 0; i < word.length; i++) {
            let letter = word[i];
            if(!matrix[index]) {
                matrix[index] = '';
            }
            if(subletter == letter && (!matrix[index][i] || matrix[index][i] == ' ') && (!matrix[index + 2] || !matrix[index + 2][i] || matrix[index + 2][i] == ' ')) {
                return i;
            }
        }
        return false;
    }

    //Build a graph from a group of words vertically.
    setLetterMatrixVertically(matrix, word, y, x) {
        for(let i = 0; i < word.length; i++) {
            let position = i + y;
            if(!matrix[position]) {
                matrix[position] = '';
            }
            let letters = matrix[position];

            if(letters.length < x) {
                while(letters.length < x) {
                    letters += ' ';
                }

                letters += word[i];
            } else {
                letters = this.wordService.insertLetterAtStringPosition(word[i], letters, x);
            }

            matrix[position] = letters;
        }
        return matrix;
    }

    fillLetterMatrixVertically(matrix, word, index) {
        let spacing = Array(index).join(" ");
        for(let i = 0; i < word.length; i++) {
            matrix[i] = spacing + word[i];
        }
        return matrix;
    }

    findMatchingLetterMatrixPositionVertical(matrix, word, subletter, index) {
        for(let i = 0; i < word.length; i++) {
            let letter = word[i];
            if(!matrix[i]) {
                matrix[i] = '';
            }

            if(subletter == letter && (!matrix[i][index] || matrix[i][index] == ' ') && (!matrix[i][index + 2] || matrix[i][index + 2] == ' ')) {
                return i;
            }
        }
        return false;
    }

    //Build a graph from a group of words horizontally.
    setLetterMatrixHorizontally(matrix, word, y, x) {
        for(let i = 0; i < word.length; i++) {
            let position = i + x;
            if(!matrix[y]) {
                matrix[y] = '';
            }
            let letters = matrix[y];

            if(letters.length < position) {
                while(letters.length < position) {
                    letters += ' ';
                }
                letters += word[i];
            } else {
                letters = this.wordService.insertLetterAtStringPosition(word[i], letters, position);
            }

            matrix[y] = letters;
        }
        return matrix;
    }

    buildUnassignedCrosswordBlock(unmatchedcrosswords) {
        let across = true;

        if(this._randomizeAxis) {
            across =  Math.random() > 0.5;
        }

        let longestwordlength = this.wordService.getLongestWordLength(unmatchedcrosswords);

        let matrix = [];
        let matrixpositions = [];

        if(across) {
            for(let i = 0; i < unmatchedcrosswords.length; i++) {
                let unmatchedcrossword = unmatchedcrosswords[i];
                matrix[i] = unmatchedcrossword;
                matrixpositions[unmatchedcrossword] = [0,i];
            }
        } else {
            for(let i = 0; i < unmatchedcrosswords.length; i++) {
                let unmatchedcrossword = unmatchedcrosswords[i];
                matrix = this.setLetterMatrixVertically(matrix, unmatchedcrossword, 0, i);
                matrixpositions[unmatchedcrossword] = [i,0];
            }
        }

        let graph = {
            'matrix':matrix,
            'matrixpositions':matrixpositions,
            'across':!across,
            'word':'(unmatched)',
        };

        return graph;
    }

    //Given a matrix, returns the widest line.
    getWidestLine(matrix): number {
        let widestlength = 0;

        for(let i = 0; i < matrix.length; i++) {
            let row = matrix[i];
            if(row && row.length && row.length > widestlength) {
                widestlength = row.length;
            }
        }

        return widestlength;
    }

    //Given a matrix, returns the thinnest line. This is the line with the most amount of black space to its right.
    getThinnestLine(matrix): number {
        let thinnestlength = 999999;

        for(let i = 0; i < matrix.length; i++) {
            let row = matrix[i];
            if(row && row.length < thinnestlength) {
                thinnestlength = row.length;
            }
        }

        return thinnestlength;
    }

    //Given a matrix, return the tallest line. This is the line with the least amount of blank space below it.
    getTallestLine(matrix): number {
        return matrix.length;
    }

    //Given two matrices of crossword puzzle graphs, join them horizontally.
    joinHorizontalMatrices(fullmatrix, matrix, coordinates) {
        if(coordinates[0] == 0 || coordinates[1] == 0) {
            return false;
        }
        let originalfullmatrix = fullmatrix;
        var maxheight = fullmatrix.length + matrix.length;
        fullmatrix = fullmatrix.slice();
        for(var i = 0; i < matrix.length; i++) {
            var line = matrix[i];

            for(var j = 0; j < line.length; j++) {
                var x = coordinates[0];
                var y = coordinates[1];

                x += j;
                y += i;

                if(!fullmatrix[y]) {
                    fullmatrix[y] = "";
                }

                if(fullmatrix[y] && fullmatrix[y][x] && fullmatrix[y][x] != ' ' && matrix[i][j] != ' ') {
                    return false;
                } else {
                    if(matrix[i][j] != ' ') {
                        if(originalfullmatrix[y - 1] && originalfullmatrix[y - 1][x] && originalfullmatrix[y - 1][x] != ' ') {
                            return false;
                        }

                        if(originalfullmatrix[y + 1] && originalfullmatrix[y + 1][x] && originalfullmatrix[y + 1][x] != ' ') {
                            return false;
                        }

                        if(originalfullmatrix[y] && originalfullmatrix[y][x - 1] && originalfullmatrix[y][x - 1] != ' ') {
                            return false;
                        }

                        if(originalfullmatrix[y] && originalfullmatrix[y][x + 1] && originalfullmatrix[y][x + 1] != ' ') {
                            return false;
                        }
                    }
                }

                while(!fullmatrix[y][x]) {
                    fullmatrix[y] += ' ';
                }
                if(matrix[i][j] != ' ') {
                    fullmatrix[y] = this.wordService.insertLetterAtStringPosition(matrix[i][j], fullmatrix[y], x);
                }
            }
        }

        return fullmatrix;
    }

    //Should we build vertically? We should do so if the crossword puzzle is wider than it is taller, which will give us the most compact crossword puzzle possibility.
    checkToBuildVertically(matrix, smallmatrix, widestline, tallestline): boolean {
        if(matrix.length <= smallmatrix.length) {
            return true;
        } else if(tallestline < widestline) {
            return true;
        } else if(widestline < tallestline) {
            return false;
        }

        return Math.random() > 0.5;
    }

    //Shift the entire matrix of crossword puzzle words by some coordinates. For example, move each row up by 1 and left by 5, which would retain the relationship among the words, since they are all moved by the same amount and in the same directions.
    interpolateMatrixPositions(matrixpositions, coordinates, word) {
        let matrixpositionwords = Object.keys(matrixpositions);

        for(let i = 0; i < matrixpositionwords.length; i++) {
            let matrixpositionword = matrixpositionwords[i];
            let matrixpositioncoordinates = matrixpositions[matrixpositionword];
            matrixpositioncoordinates[0] += coordinates[0];
            matrixpositioncoordinates[1] += coordinates[1];
        }

        return matrixpositions;
    }

    //Are these two rows without conflicts between each other? A conflict is when one of the words from one row touch the words of another row (which breaks the crossword puzzle rule that only corners and edges may be the origin of a word, and never the center of the grid block).
    nonConflictingRows(toprow, bottomrow): boolean {
        let rowtocheck;
        let altrowtocheck;

        if(toprow[bottomrow.length] && toprow[bottomrow.length] == ' ') {
            return false;
        }

        if(toprow.length > bottomrow.length) {
            rowtocheck = bottomrow;
            altrowtocheck = toprow;
        } else {
            rowtocheck = toprow;
            altrowtocheck = bottomrow;
        }

        for(let i = 0; i < rowtocheck.length; i++) {
            if(rowtocheck[i] && altrowtocheck[i]) {
                if(rowtocheck[i] != ' ' && altrowtocheck[i] != ' ') {
                    return false;
                }
            }
        }

        return true;
    }

    //Given two matrices of crossword puzzle graphs, join them vertically.
    joinVerticalMatrices(bigmatrix, smallmatrix) {
        let height = bigmatrix.length;

        for(let i = 0; i < smallmatrix.length; i++) {
            bigmatrix[height + i] = smallmatrix[i];
        }

        return bigmatrix;
    }

    //Add another blank column to the crossword puzzle grid.
    incrementMatrixHorizontally(matrix) {
        for(let i = 0; i < matrix.length; i++) {
            matrix[i] = ' ' + matrix[i];
        }
        return matrix;
    }
}
