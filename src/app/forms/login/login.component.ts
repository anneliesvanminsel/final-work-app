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
  isLoading:  boolean = false;

  constructor(private  authService:  AuthService, private router: Router) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.login(email, password);

    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      isLoggedIn &&  this.router.navigate(['/index']);
      this.isLoading = false;
    });

    form.reset();
  }

}
