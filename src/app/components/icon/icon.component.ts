import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() class: string;

  classList: string = 'icon';

  constructor() { }

  ngOnInit() {
    if (this.class) {
      this.classList += ' ' + this.class;
    }
  }

}
