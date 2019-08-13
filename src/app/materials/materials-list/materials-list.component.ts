import { Component, OnInit } from '@angular/core';
import { Material } from '../../models/material.model';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MaterialService} from '../../services/material.service';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss']
})
export class MaterialsListComponent implements OnInit {
  private _courseid: string;
  materials$: Observable<any>;

  constructor(private route: ActivatedRoute, private materialService: MaterialService) {
    this.route.paramMap.subscribe(params => {
      this._courseid = params.get("courseid")
    });
  }

  ngOnInit() {
    this.materials$ = this.materialService.getMaterialsByCourse(this._courseid);
  }

}
