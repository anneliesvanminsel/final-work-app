import { Component, OnInit } from '@angular/core';
import {Class} from '../../classes/class.model';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {
  classes: Class[] = [
    new Class(1,'4A', '10/1/2019'),
    new Class(2, '3B', '30/12/2018'),
    new Class(3,'2D', '25/12/2018'),
    new Class(4, '3D', '10/1/2019'),
    new Class(5, '1G', '30/12/2018')
  ];

  constructor() { }

  ngOnInit() {
  }

}
