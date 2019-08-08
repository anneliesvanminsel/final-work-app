import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardTitle: String;
  @Input() cardMessage: String;
  @Input() cardColor: String;

  constructor() { }

  ngOnInit() {
  }

}
