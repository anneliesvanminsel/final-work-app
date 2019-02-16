import { Component, OnInit } from '@angular/core';
import { Material } from '../material.model';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})
export class MaterialsListComponent implements OnInit {
  materials: Material[] = [
    new Material('Toets Biodiversiteit', '10/1/2019', 1),
    new Material('Taak Menselijk hart', '30/12/2018', 1),
    new Material('Toets Menselijk lichaam', '25/12/2018', 1),
    new Material('Toets Kruistochten', '10/1/2019', 2),
    new Material('Taak Middeleeuwen', '30/12/2018', 2),
    new Material('Taak Magna Charta', '10/1/2019', 2),
    new Material('Werkblad kruistochten', '30/12/2018', 2)
  ];

  constructor() { }

  ngOnInit() {
  }

}
