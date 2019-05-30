import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/authservice.service';


@Component({
  selector: 'app-header-teacher',
  templateUrl: './header-teacher.component.html',
  styleUrls: ['./header-teacher.component.scss']
})
export class HeaderTeacherComponent implements OnInit {
  user;

  constructor(private  authService:  AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout();
  }
}

/*
(() => {
  const colors = ["yellow", "green", "red", "purple"];

  const randomColor = (() => {
    return colors[Math.floor(Math.random() * colors.length)];
  })();

  document.querySelector(".sidebar").classList.add(`theme-${randomColor}`);

}
*/
