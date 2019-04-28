import { Component, OnInit } from '@angular/core';
import {ClassgroupService} from '../services/classgroup.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  providers: [ClassgroupService]
})
export class ClassesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
