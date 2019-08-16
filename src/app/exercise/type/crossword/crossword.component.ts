import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cell } from '../../../models/crossword/cell.model';
import { Word } from '../../../models/crossword/word.model';
import { Crossword } from '../../../models/crossword/crossword.model';

import { CrosswordsService } from '../../../services/crosswords.service';

@Component({
  selector: 'app-crossword',
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.css']
})
export class CrosswordComponent implements OnInit {
  private _currentWord: Word;
  private _currentCell: Cell;
  public crossword: Crossword;

  public snackbarActive: boolean = false;
  public snackbarText: string = null;
  public snackbarStyle: string = null;

  constructor(private _route: ActivatedRoute, private _crosswordsService: CrosswordsService) {
  }

  public showQuestion() {
    this.snackbarActive = true;
    this.snackbarText = this._currentWord.question;
    this.snackbarStyle = 'slideInUp';
  }

  public hideQuestion() {
    this.snackbarStyle = 'slideOutDown';
    setTimeout(() => {
      this.snackbarText = null;
      this.snackbarActive = false;
    }, 400);
  }

  public ngOnInit(): void {
    this._crosswordsService
        .getCrossword(this._route.snapshot.params['crosswordId'])
        .then((crossword: Crossword) => {
          this.crossword = crossword;
        });
  }

  private _clearCurrents(): void {
    this._currentWord = null;
    this._currentCell = null;
    this.hideQuestion();
  }

  public isSelected(cell: Cell): boolean {
    return cell === this._currentCell;
  }

  public isHighlighted(cell: Cell): boolean {
    if (!this._currentWord) {
      return false;
    }

    return this._currentWord.isPositionInRange(cell.x, cell.y);
  }

  public isSuccess(cell: Cell): boolean {
    return cell.success;
  }

  public onGridClick(): void {
    this.hideQuestion();
    this._clearCurrents();
  }

  public onCellClick(event: MouseEvent, cell: Cell): void {
    if (this.isSuccess(cell)) {
      return;
    }

    let words = this.crossword.getWordsWhereCellInRange(cell);

    words.length !== 1 && cell === this._currentCell
        ? this._currentWord = this._currentWord === words[0]
        ? words[1]
        : words[0]
        : this._currentWord = words[0];

    this._currentCell = cell;

    this.showQuestion();

    event.stopPropagation();
  }

  public onKey(event: KeyboardEvent): void {
    if (!this._currentCell) {
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      this._clearCurrentCellChar();
      return;
    }

    if (event.key.length === 1 && isNaN(+event.key)) {
      this._setCurrentCellChar(event.key.toUpperCase());
    }
  }

  private _selectPreviousCell(): void {
    let x = this._currentWord.isOnAxisX
        ? this._currentCell.x - 1
        : this._currentCell.x;

    let y = this._currentWord.isOnAxisY
        ? this._currentCell.y - 1
        : this._currentCell.y;

    this._currentCell = this.crossword.getCellByPosition(x, y);

    if (!this._currentCell) {
      this._clearCurrents();
      return;
    }

    if (this._currentCell.success) {
      this._selectPreviousCell();
    }
  }

  private _selectNextCell(): void {
    let x = this._currentWord.isOnAxisX
        ? this._currentCell.x + 1
        : this._currentCell.x;

    let y = this._currentWord.isOnAxisY
        ? this._currentCell.y + 1
        : this._currentCell.y;

    this._currentCell = this.crossword.getCellByPosition(x, y);

    if (!this._currentCell) {
      this._clearCurrents();
      return;
    }

    if (this._currentCell.success) {
      this._selectNextCell();
    }
  }

  private _checkWordSuccess(word: Word): void {
    let answer = '';

    for (let i = 0; i < word.length; i++) {
      let x = word.x;
      let y = word.y;

      if (word.isOnAxisX) { x = x + i; };
      if (word.isOnAxisY) { y = y + i; };

      let cell = this.crossword.getCellByPosition(x, y);
      answer += cell.value;
    }

    if (answer === word.answer.toUpperCase()) {
      this._setWordCellsSuccess(word);

      if (word === this._currentWord) {
        this.hideQuestion();
      }
    }
  }

  private _setWordCellsSuccess(word: Word): void {
    for (let i = 0; i < word.length; i++) {
      let x = word.x;
      let y = word.y;

      if (word.isOnAxisX) { x = x + i; };
      if (word.isOnAxisY) { y = y + i; };

      let cell = this.crossword.getCellByPosition(x, y);
      cell.success = true;
    }
  }

  public _clearCurrentCellChar(): void {
    this._currentCell.value
        ? this._currentCell.value = null
        : this._selectPreviousCell();
  }

  public _setCurrentCellChar(char: string): void {
    this._currentCell.value = char;

    for (let word of this.crossword.getWordsWhereCellInRange(this._currentCell)) {
      this._checkWordSuccess(word);
    }

    this._selectNextCell();
  }
}
