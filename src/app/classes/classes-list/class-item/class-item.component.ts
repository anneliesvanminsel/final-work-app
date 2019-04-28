import { Component, OnInit, Input } from '@angular/core';
import { Classgroup } from '../../../models/classgroup.model';
import {ClassgroupService} from '../../../services/classgroup.service';

@Component({
  selector: 'app-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.scss']
})
export class ClassItemComponent implements OnInit {
  @Input() classgroup: Classgroup;

  constructor(private classgroupService: ClassgroupService) { }

  ngOnInit() {
  }

}
