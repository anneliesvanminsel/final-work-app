import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-student',
  templateUrl: './header-student.component.html',
  styleUrls: ['./header-student.component.scss']
})
export class HeaderStudentComponent implements OnInit {
  show:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /*
  * komt van
  * https://angularfirebase.com/lessons/bootstrap-4-collapsable-navbar-work-with-angular/
  */
  toggleCollapse() {
    this.show = !this.show;
  }
}
