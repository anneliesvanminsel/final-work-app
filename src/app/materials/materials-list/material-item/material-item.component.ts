import {Component, Input, OnInit} from '@angular/core';
import {Material} from '../../../models/material.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-material-item',
  templateUrl: './material-item.component.html',
  styleUrls: ['./material-item.component.scss']
})
export class MaterialItemComponent implements OnInit {
  @Input() material: Material;
  @Input() index: number;
  private _courseid: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this._courseid = params.get("courseid")
    });
  }

}
