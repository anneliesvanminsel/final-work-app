import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-colorrow',
  templateUrl: './colorrow.component.html',
  styleUrls: ['./colorrow.component.scss']
})
export class ColorrowComponent implements OnInit {
  @Input() position: String;

  constructor() { }

  ngOnInit() {
  }

}
