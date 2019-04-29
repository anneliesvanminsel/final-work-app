import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import {ClassgroupService} from '../../services/classgroup.service';
import {Classgroup} from '../../models/classgroup.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.scss']
})
export class AddClassComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('dateInput') dateInputRef: ElementRef;

  classgroup: Classgroup ={
    id: '',
    name: '',
    date: '',
  };
  constructor(private router: Router, private classgroupService: ClassgroupService) { }

  ngOnInit() {
  }

  onAddClass() {
    this.classgroup.name = this.nameInputRef.nativeElement.value;
    this.classgroup.date = this.dateInputRef.nativeElement.value;
    this.classgroupService.addClassgroup(this.classgroup);

  }
}

