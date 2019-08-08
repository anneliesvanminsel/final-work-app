import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/authservice.service';
import { Account } from  '../../models/account';

@Component({
  selector: 'app-header-teacher',
  templateUrl: './header-teacher.component.html',
  styleUrls: ['./header-teacher.component.scss']
})
export class HeaderTeacherComponent implements OnInit {
  account: Account;

  constructor(private  authService:  AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      isLoggedIn && (this.account = this.authService.account);
    });
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
