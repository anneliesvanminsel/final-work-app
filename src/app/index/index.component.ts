import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  user: Account;

  constructor(private  authService:  AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      isLoggedIn && (this.user = this.authService.account);
    });
  }

}
