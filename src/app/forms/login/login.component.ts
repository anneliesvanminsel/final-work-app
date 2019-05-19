import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from  '../../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('mailInput') mailInputRef: ElementRef;
  @ViewChild('passwordInput') passwordInputRef: ElementRef;

  constructor(private  authService:  AuthService) { }

  ngOnInit() {}

  onLogin() {
    this.authService.login(this.mailInputRef.nativeElement.value, this.passwordInputRef.nativeElement.value);
  }

}
