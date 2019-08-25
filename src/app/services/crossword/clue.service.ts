import { Injectable } from '@angular/core';

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

/*
        let acrosslistordered = this.fillInCrossWordNumbers(acrosslist);
        let downlistordered = this.fillInCrossWordNumbers(downlist);

        console.log('across', acrosslistordered);
        console.log('down', downlistordered);
*/
        let acrosslistorderedelement = this.getViewableCrossWordList(acrosslist, clues, true);
        let downlistorderedelement = this.getViewableCrossWordList(downlist, clues, false);

        this.acrossClueList = acrosslistorderedelement;
        this.downClueList = downlistorderedelement;
    }

    /* getViewableCrossWordList(listitems, clues, across)
    
        Get a single crossword list, which may be used for either across or down lists.
    
    */

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

    /* fillInCrossWordNumbers(listitems, blockitems, blockitemsordered)
    
        Fill in the numbers in the crossword puzzle boxes that are each individually associated with a particular clue from the across or down lists.
    
    */

    fillInCrossWordNumbers(listitems, blockitems, blockitemsordered) {
        console.log(listitems, blockitems, blockitemsordered);
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

            orderedlist[listnumber] = {
                'word': word,
                'position':coordinates,
            };
        }

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
