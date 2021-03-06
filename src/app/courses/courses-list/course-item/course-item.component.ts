import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../models/course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;
  @Input() link: string;
  fullLink: string;
  constructor() { }

  ngOnInit() {
    this.fullLink = this.link + this.course.id;
  }

}
