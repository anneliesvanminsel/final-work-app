import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Account} from "../../models/account.model";

@Component({
  selector: 'app-header-student',
  templateUrl: './header-student.component.html',
  styleUrls: ['./header-student.component.scss']
})
export class HeaderStudentComponent implements OnInit {
  account: Account;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      isLoggedIn && (this.account = this.authService.account);
    });
  }

}
