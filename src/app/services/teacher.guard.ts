
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class TeacherGuard implements CanActivate {
    constructor(private authService: AuthService, public router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {

        let isLoggedIn: boolean = false;

        this.authService.isLoggedIn.subscribe(value => {
            if (value) {
                isLoggedIn = true;
            } else {
                isLoggedIn = false;
            }
        });

        if (isLoggedIn && this.authService.isTeacher) {
            console.log('gebruiker mag leerkracht', this.authService.account);
            return true;
        } else {
            console.log('gebruiker mag niet leerkracht', this.authService.account);
            this.router.navigate(['login']);
            return false;
        }

    }
}
