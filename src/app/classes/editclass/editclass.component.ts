import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import {ClassgroupService} from '../../services/classgroup.service';
import {Classgroup} from '../../models/classgroup.model';

@Component({
  selector: 'app-editclass',
  templateUrl: './editclass.component.html',
  styleUrls: ['./editclass.component.scss']
})
export class EditclassComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;

  classgroup: Classgroup ={
    id: '',
    name: '',
    date: '',
  };
  constructor(private classgroupService: ClassgroupService) { }

  ngOnInit() {
  }

  onAddItem() {
    const updateName = this.nameInputRef.nativeElement.value;
    const newClass = new Classgroup(updateName);
    this.classgroupService.addClassgroup(newClass);
  }
}
