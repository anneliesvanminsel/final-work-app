import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class WordService {

    getLettersHashCountForWord(word): any[] {
        let lettershash = [];

        for(let i = 0; i < word.length; i++) {
            let letter = word[i];
            if(lettershash[letter]) {
                lettershash[letter]++;
            } else {
                lettershash[letter] = 1;
            }
        }

        return lettershash;
    }

    getMatchingLetter(letters, nextWord): string {
        let matchingLetter = '';

        for(let i = 0; i < nextWord.length; i++) {
            let letter = nextWord[i];
            if(letters[letter]) {
                return letter;
            }
        }

        return matchingLetter;
    }

    getLongestWordLength(words): number {
        let length = 0;

        for(let i = 0; i < words.length; i++) {
            let word = words[i];
            let wordlength = word[0].length;
            if(wordlength > length) {
                length = wordlength;
            }
        }

        return length;
    }

    //Find the position of a letter in a word.
    findMatchingOffset(word, letter): number {
        for(let i = 0; i < word.length; i++) {
            if(word[i] == letter) {
                return i;
            }
        }
        return undefined;
    }

    //Arrays are immutable within JavaScript. So, this method allows us to edit strings by inserting letters at positions.
    insertLetterAtStringPosition(letter, string, position) {
        if(!letter) {
            letter = ' ';
        }
        return string.substr(0, position) + letter + string.substr(position + 1);
    }
}
