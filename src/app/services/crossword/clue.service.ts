import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ClueService {
    /* buildCrosswordLists(matrixpositions)


	*/
    //From the crossword puzzle, build the lists of across and down.
    buildCrosswordLists(matrixpositions) {
        let acrosslist = [];
        let downlist = [];

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

}
