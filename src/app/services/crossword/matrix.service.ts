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
    getWidestLine(matrix) {
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
    getThinnestLine(matrix) {
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
    getTallestLine(matrix) {
        return matrix.length;
    }


}
