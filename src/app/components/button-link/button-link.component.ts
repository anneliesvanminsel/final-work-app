import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss']
})
export class ButtonLinkComponent implements OnInit {
  @Input() label: string;
  @Input() link: string;
  @Input() class: string;
  @Input() icon: boolean;

  private classList: string = 'button';

  constructor() { }

  ngOnInit() {
    if (this.class) {
      this.classList += ' ' + this.class;
    }

    if (this.icon) {
      this.classList += ' ' + 'has-icon';
    }
  }

}
