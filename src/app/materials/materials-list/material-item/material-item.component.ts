import {Component, Input, OnInit} from '@angular/core';
import {Material} from '../../../models/material.model';

@Component({
  selector: 'app-material-item',
  templateUrl: './material-item.component.html',
  styleUrls: ['./material-item.component.scss']
})
export class MaterialItemComponent implements OnInit {
  @Input() material: Material;
  @Input() index: number;

  constructor() { }

  ngOnInit() {}

}
