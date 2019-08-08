import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from  '../../services/authservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('mailInput') mailInputRef: ElementRef;
  @ViewChild('passwordInput') passwordInputRef: ElementRef;

  constructor(private  authService:  AuthService, private router: Router) { }

  ngOnInit() {}

  onLogin() {
    this.authService.login(this.mailInputRef.nativeElement.value, this.passwordInputRef.nativeElement.value);
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      console.log('account login', this.authService.account);
      isLoggedIn &&  this.router.navigate(['/index']);
    });
  }

}
