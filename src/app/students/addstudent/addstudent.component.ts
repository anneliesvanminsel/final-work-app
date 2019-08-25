import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassgroupService} from '../../services/classgroup.service';
import {StudentTeacherService} from '../../services/student-teacher.service';
import {Classgroup} from '../../models/classgroup.model';
import {Student} from '../../models/student.model';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
  private id: string;
  link: string = "/teacher/classes/detail/" ;
  class: Classgroup;

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('mailInput') mailInputRef: ElementRef;

  newStudent: Student = {
    id: '',
    name: '',
    email: '',
    class_id: '',
  };

  constructor(
      private classgroupService: ClassgroupService,
      private studentTeacherService: StudentTeacherService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("classid")
    });
    this.link += this.id;
    this.setClass();
  }

  async setClass() {
    await this.classgroupService.getClassgroupFromDb(this.id);
    this.class = this.classgroupService.class;
  }

  onAddStudent() {
    this.newStudent.name = this.nameInputRef.nativeElement.value;
    this.newStudent.email = this.mailInputRef.nativeElement.value;
    this.newStudent.class_id = this.id;
    this.studentTeacherService.addStudent(this.newStudent);
    this.router.navigate([this.link]);
  }
}
