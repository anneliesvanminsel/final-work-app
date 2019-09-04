import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
    providedIn: 'root'
})

export class ClueService {
    acrossClueList = [];
    downClueList = [];

    get acrossClues() {
        return this.acrossClueList;
    }

    get downClues() {
        return this.downClueList;
    }


    //From the crossword puzzle, build the lists of across and down.
    buildCrosswordLists(matrixpositions) {
        let acrosslist = [];
        let downlist = [];

        if(matrixpositions){
            for(let i = 0; i < matrixpositions.length; i++) {
                let matrixposition = matrixpositions[i];

                let across = matrixposition['across'];
                let word = matrixposition['word'];
                let positions = matrixposition['matrixpositions'];

                let primaryelement = {
                    'word':word,
                    'position':positions[word],
                };

                delete positions[word];
                if(across) {
                    if(word != '(unmatched)') {
                        acrosslist.push(primaryelement);
                    }
                    downlist = this.buildCrosswordList(downlist, positions);
                } else {
                    if(word != '(unmatched)') {
                        downlist.push(primaryelement);
                    }
                    acrosslist = this.buildCrosswordList(acrosslist, positions);
                }
            }
        }

        return {
            'across':acrosslist,
            'down':downlist,
        };
    }

    //Build a single crossword list, either for across or down.
    buildCrosswordList(list, positions) {
        let matrixpositionwords = Object.keys(positions);
        for(let i = 0; i < matrixpositionwords.length; i++) {
            let matrixpositionword = matrixpositionwords[i];
            let coordinates = positions[matrixpositionword];
            list.push({
                'word':matrixpositionword,
                'position':coordinates,
            });
        }

        return list;
    }

    showCrossWordLists(wordlists, clues) {

        let acrosslist = wordlists['across'];
        let downlist = wordlists['down'];

        console.log('across 1', acrosslist);
        console.log('down 1', downlist);

        let acrosslistordered = this.fillInCrossWordNumbers(acrosslist, acrosslist, acrosslist);
        let downlistordered = this.fillInCrossWordNumbers(downlist, acrosslist, acrosslistordered);

        console.log('across', acrosslistordered);
        console.log('down', downlistordered);

        let acrosslistorderedelement = this.getViewableCrossWordList(acrosslistordered, clues, true);
        let downlistorderedelement = this.getViewableCrossWordList(downlistordered, clues, false);

        this.acrossClueList = acrosslistorderedelement;
        this.downClueList = downlistorderedelement;
    }

    //Get a single crossword list, which may be used for either across or down lists.
    getViewableCrossWordList(listitems, clues, across) {
        let numbers = Object.keys(listitems);

        let newList = [];

        for(let i = 0; i < numbers.length; i++) {
            let number = numbers[i];
            let wordinfo = listitems[number];
            let word = wordinfo['word'];
            let coordinates = wordinfo['position'];
            let clue = clues[word];

            let newClue = {
                word:  word.replace(/"/g, '&quot;'),
                clue: clue.replace(/"/g, '&quot;'),
                posX: coordinates[0],
                posY: coordinates[1],
                posAcross: across,
                number: number,
            };

            newList.push(newClue);

        }
        return newList;
    }

    //Fill in the numbers in the crossword puzzle boxes that are each individually associated with a particular clue from the across or down lists.
    fillInCrossWordNumbers(listitems, blockitems, blockitemsordered) {
        let orderedlist = [];
        let listnumber = 0;
        for(let i = 0; i < listitems.length; i++) {
            listnumber++;

            let listitem = listitems[i];
            let word = listitem['word'];
            let coordinates = listitem['position'];

            let blockingitemnumber = this.getBlockingItemNumber(coordinates, blockitems, blockitemsordered);

            let fillnumber = listnumber;
            if(blockingitemnumber) {
                fillnumber = <any> blockingitemnumber;
            }

            var element = '<div class="background-text"><span class="crossword-grid-cell-number">' + fillnumber + '</span></div>';

            var parentelement;

            parentelement = $('#cell-position-' + coordinates[0] + '-' + coordinates[1]);

            if(parentelement && $(parentelement).attr('id')) {
                $(parentelement).prepend(element);
            }


            orderedlist[listnumber] = {
                'word': word,
                'position':coordinates,
            };
        }
        console.log(orderedlist);

        return orderedlist;
    }

    getBlockingItemNumber(coordinates, blockitems, blockitemsordered) {
        if(!blockitems || !blockitems.length || !blockitemsordered || !blockitemsordered.length) {
            return false;
        }
        for (let i = 0; i < blockitems.length; i++) {
            let blockitem = blockitems[i];

            let blockcoordinates = blockitem['position'];

            if(blockcoordinates[0] == coordinates[0] && blockcoordinates[1] == coordinates[1]) {
                return this.getBlockItemNumberPosition(blockitem['word'], blockitemsordered);
            }
        }

        return false;
    }

    getBlockItemNumberPosition(word, items) {
        let itemkeys = Object.keys(items);

        for(let i = 0; i < itemkeys.length; i++) {
            let itemkey = itemkeys[i];

            let itemword = items[itemkey];

            if(itemword.word == word) {
                return itemkey;
            }
        }
    }

}
