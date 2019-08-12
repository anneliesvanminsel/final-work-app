import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CourseService} from '../../services/course.service';
import {Course} from '../../models/course.model';
import {Classgroup} from '../../models/classgroup.model';
import {ClassgroupService} from '../../services/classgroup.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('yearInput') yearInputRef: ElementRef;

  course: Course ={
    name: '',
    year: '',
    allowedClasses: [Classgroup],
  };

  classgroups: Classgroup[];
  constructor(private router: Router, private coureService: CourseService, private classgroupService: ClassgroupService) { }

  ngOnInit() {
    this.classgroupService.getClassgroups().subscribe(classes => {
      this.classgroups = classes;
    });
  }

  onAddCourse() {
    this.course.name = this.nameInputRef.nativeElement.value;
    this.course.year = this.yearInputRef.nativeElement.value;
    this.coureService.addCourse(this.course);
    this.router.navigate(['/teacher/courses']);
  }
}
