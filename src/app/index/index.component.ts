import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/authservice.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  user;

  constructor(private  authService:  AuthService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('dba'));
  }

}
