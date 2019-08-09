import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss']
})
export class InputfieldComponent implements OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() id: string;
  @Input() name: string;
  @Input() variable: string;
  @Input() extra: string;



  constructor() { }

  ngOnInit() { }

}
