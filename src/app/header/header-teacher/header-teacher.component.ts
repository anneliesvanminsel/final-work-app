import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-teacher',
  templateUrl: './header-teacher.component.html',
  styleUrls: ['./header-teacher.component.scss']
})
export class HeaderTeacherComponent implements OnInit {
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
