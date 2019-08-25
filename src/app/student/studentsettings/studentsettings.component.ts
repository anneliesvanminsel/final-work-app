import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-studentsettings',
  templateUrl: './studentsettings.component.html',
  styleUrls: ['./studentsettings.component.scss']
})
export class StudentsettingsComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['index']);
  }
}
