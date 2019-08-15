
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
        const isLoggedIn = this.authService.isLoggedIn.subscribe(value => {
            console.log('isLoggedIn', value);

            if (value) {
                return true;
            } else {
                return false;
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
