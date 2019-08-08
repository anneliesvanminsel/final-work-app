import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() class: string;
  @Output() onClick = new EventEmitter<any>();
  private classList: string = 'button';

  constructor() { }

  ngOnInit() {
    if (this.class) {
      this.classList += ' ' + this.class;
    }
  }
  onClickButton(event) {
    this.onClick.emit(event);
  }
/*
 <app-button
                    (onClick)="functioncall($event)" [label]="label"
            ></app-button>
 */
}
