import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ClueService {
    leftList = '';
    rightList= '';
    /* buildCrosswordLists(matrixpositions)


	*/
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


        let acrosslistordered = this.fillInCrossWordNumbers(acrosslist);
        let downlistordered = this.fillInCrossWordNumbers(downlist, acrosslist, acrosslistordered);

        let acrosslistorderedelement = this.getViewableCrossWordList(acrosslistordered, clues, true);
        let downlistorderedelement = this.getViewableCrossWordList(downlistordered, clues, false);

        this.leftList = acrosslistorderedelement;
        this.rightList = downlistorderedelement;
    }

    /* getViewableCrossWordList(listitems, clues, across)
    
        Get a single crossword list, which may be used for either across or down lists.
    
    */

    getViewableCrossWordList(listitems, clues, across) {
        let numbers = Object.keys(listitems);

        let element = '<ul>';

        for(let i = 0; i < numbers.length; i++) {
            let number = numbers[i];
            let wordinfo = listitems[number];
            let word = wordinfo['word'];
            let coordinates = wordinfo['coordinates'];
            let clue = clues[word];

            element += '<li ';
            element += 'data-word="' + word.replace(/"/g, '&quot;') + '" ';
            element += 'data-clue="' + clue.replace(/"/g, '&quot;') + '" ';
            element += 'data-x="' + coordinates[0] + '" ';
            element += 'data-y="' + coordinates[1] + '" ';
            element += 'data-across="' + across + '" ';
            element += 'class="word-clue clickable" ';
            element += '>';
            element += number + ' : ' ;
            element += '<span id="';
            element += word + '-listing';
            element += '" ';
            element += 'class="linkable">';
            element += clue;
            element += '</span>';
            element += '</li>';
        }

        element += '</ul>';

        return element;
    }

    /* fillInCrossWordNumbers(listitems, blockitems, blockitemsordered)
    
        Fill in the numbers in the crossword puzzle boxes that are each individually associated with a particular clue from the across or down lists.
    
    */

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
                fillnumber = blockingitemnumber;
            }

            orderedlist[listnumber] = {
                'word':word,
                'coordinates':coordinates,
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
