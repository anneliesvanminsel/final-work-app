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
export class AddclassComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;

  classgroup: Classgroup ={
    id: '',
    name: '',
    date: '',
  };
  constructor(private router: Router, private classgroupService: ClassgroupService) { }

  ngOnInit() {
  }

  onAddClass() {
    const updateName = this.nameInputRef.nativeElement.value;
    this.classgroup.name = updateName;
    this.classgroupService.addClassgroup(this.classgroup);
    this.router.navigate(['/teacher/classes']);
  }
}

