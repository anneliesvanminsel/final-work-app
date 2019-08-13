import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('mailInput') mailInputRef: ElementRef;
  @ViewChild('passwordInput') passwordInputRef: ElementRef;

  isLoading:  boolean = false;

  constructor(private  authService:  AuthService, private router: Router) { }

  ngOnInit() {}

  onLogin() {
    this.isLoading = true;
    this.authService.login(this.mailInputRef.nativeElement.value, this.passwordInputRef.nativeElement.value);

    this.authService.isLoggedIn.subscribe((isLoggedIn) => {

      isLoggedIn &&  this.router.navigate(['/index']);
    });
  }
  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.login(email, password);

    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      console.log('account login', this.authService.account);
      this.isLoading = false;
      isLoggedIn &&  this.router.navigate(['/index']);
    });

    form.reset();
  }
}
