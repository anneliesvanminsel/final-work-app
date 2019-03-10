import { Component, OnInit } from '@angular/core';
import { Material } from '../material.model';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss']
})
export class MaterialsListComponent implements OnInit {
  materials: Material[] = [
    new Material(1,'Toets Biodiversiteit', '10/1/2019', 1),
    new Material(2, 'Taak Menselijk hart', '30/12/2018', 1),
    new Material(3,'Toets Menselijk lichaam', '25/12/2018', 1),
    new Material(4, 'Toets Kruistochten', '10/1/2019', 2),
    new Material(5, 'Taak Middeleeuwen', '30/12/2018', 2),
    new Material(6, 'Taak Magna Charta', '10/1/2019', 2),
    new Material(7, 'Werkblad kruistochten', '30/12/2018', 2)
  ];

  constructor() { }

  ngOnInit() {
  }

}
