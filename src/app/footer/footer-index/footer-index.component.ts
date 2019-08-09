import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Account} from '../../models/account.model';

@Component({
  selector: 'app-footer-index',
  templateUrl: './footer-index.component.html',
  styleUrls: ['./footer-index.component.scss']
})
export class FooterIndexComponent implements OnInit {
  user: Account;

  constructor(private  authService:  AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      isLoggedIn && (this.user = this.authService.account);
    });
  }

}
