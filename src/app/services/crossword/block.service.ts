import { Injectable } from '@angular/core';
import {MatrixService} from './matrix.service';
import {GridService} from './grid.service';

@Injectable({
    providedIn: 'root'
})

export class BlockService {
    constructor(
        private gridService: GridService,
        private matrixService: MatrixService,
    ) { }

    //Compact a single crossword block source graph.
    compactCrosswordBlockSource(graph) {
        graph = this.compactCrosswordBlockBottom(graph);
        graph = this.compactCrosswordBlockTop(graph);
        graph = this.compactCrosswordBlockLeft(graph);
        graph = this.compactCrosswordBlockRight(graph);
        return graph;
    }

    //Compact the crossword block from the top.
    compactCrosswordBlockTop(graph) {
        let crosswordblock = graph['matrix'];
        let crosswordblocksolutions = graph['matrixpositions'];
        let crosswordblockacross = graph['across'];

        let crosswordblocklength = crosswordblock.length;

        for(let i = 0; i < crosswordblocklength; i++) {
            let row = crosswordblock[i];
            let trimmedrow = row.trim();
            if(!row || !trimmedrow.length) {
                crosswordblock.splice(i, 1);
                crosswordblocksolutions = this.incrementCrossWordBlockHeights(crosswordblocksolutions);
                i--;
                crosswordblocklength--;
            } else {
                i = crosswordblocklength;
            }
        }

        graph['matrix'] = crosswordblock;
        graph['matrixpositions'] = crosswordblocksolutions;

        return graph;
    }

	//Compact a crossword block on the bottom.
    compactCrosswordBlockBottom(graph) {
        let crosswordblock = graph['matrix'];
        let crosswordblocksolutions = graph['matrixpositions'];
        let crosswordblockacross = graph['across'];

        let crosswordblocklength = crosswordblock.length;
        for(let i = crosswordblocklength - 1; i >= 0; i--) {
            let row = crosswordblock[i];
            let trimmedrow = row.trim();
            if(!trimmedrow.length) {
                crosswordblock.splice(i, 1);
            } else {
                i = -1;
            }
        }

        graph['matrix'] = crosswordblock;
        graph['matrixpositions'] = crosswordblocksolutions;

        return graph;
    }

    //Compact a crossword block on the left.
    compactCrosswordBlockLeft(graph) {
        let crosswordblock = graph['matrix'];
        let crosswordblocksolutions = graph['matrixpositions'];
        let crosswordblockacross = graph['across'];

        let crosswordblocklength = crosswordblock.length;

        let shorten = true;

        while(shorten) {
            if(crosswordblocklength) {
                for(let i = 0; i < crosswordblocklength; i++) {
                    if(crosswordblock[i]) {
                        let crosswordrow = crosswordblock[i];
                        if(crosswordrow && crosswordrow[0] && crosswordrow[0] != ' ') {
                            shorten = false;
                            i = crosswordblocklength;
                        }
                    }
                }
            } else {
                shorten = false;
            }

            if(shorten) {
                for(let i = 0; i < crosswordblocklength; i++) {
                    let crosswordrow = crosswordblock[i];
                    crosswordblock[i] = crosswordrow.substr(1, crosswordrow.length);
                }

                crosswordblocksolutions = this.incrementCrossWordBlockLengths(crosswordblocksolutions);
            }
        }

        graph['matrix'] = crosswordblock;
        graph['matrixpositions'] = crosswordblocksolutions;

        return graph;
    }

    //Compact a crossword block on the right.
	compactCrosswordBlockRight(graph) {
        var crosswordblock = graph['matrix'];
        var crosswordblocksolutions = graph['matrixpositions'];
        var crosswordblockacross = graph['across'];

        var longestpiece = this.matrixService.getWidestLine(crosswordblock) - 1;
        var crosswordblocklength = crosswordblock.length;

        var shorten = true;

        while(shorten) {
            if(crosswordblocklength) {
                for(var i = 0; i < crosswordblocklength; i++) {
                    if(crosswordblock[i]) {
                        var crosswordrow = crosswordblock[i];
                        if(crosswordrow[longestpiece] && crosswordrow[longestpiece] != ' ') {
                            shorten = false;
                            i = crosswordblocklength;
                        }
                    }
                }
            } else {
                shorten = false;
            }
            if(shorten) {
                longestpiece--;
                for(var i = 0; i < crosswordblocklength; i++) {
                    var crosswordrow = crosswordblock[i];
                    crosswordblock[i] = crosswordrow.substr(0, crosswordrow.length - 1);
                }
            }
        }

        graph['matrix'] = crosswordblock;
        graph['matrixpositions'] = crosswordblocksolutions;

        return graph;
    }


	//Increase the vertical position of the words in a crossword block by one.
	incrementCrossWordBlockHeights(crosswordblocksolutions) {
        if(!crosswordblocksolutions) {
            return crosswordblocksolutions;
        }

        let crosswordblockwords = Object.keys(crosswordblocksolutions);
        for(var i = 0; i < crosswordblockwords.length; i++) {
            var crosswordblockword = crosswordblockwords[i];

            crosswordblocksolutions[crosswordblockword][0]--;
        }
        return crosswordblocksolutions;
    }

	//Increase the horizontal position of the words in a crossword block by one.
	incrementCrossWordBlockLengths(crosswordblocksolutions) {
        if(!crosswordblocksolutions) {
            return crosswordblocksolutions;
        }

        let crosswordblockwords = Object.keys(crosswordblocksolutions);
        for(let i = 0; i < crosswordblockwords.length; i++) {
            let crosswordblockword = crosswordblockwords[i];

            crosswordblocksolutions[crosswordblockword][1]--;
        }
        return crosswordblocksolutions;
    }

}
