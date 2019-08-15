
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class StudentGuard implements CanActivate {
    constructor(private authService: AuthService, public router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {

        let isLoggedIn: boolean = false;

        this.authService.isLoggedIn.subscribe(value => {
            console.log('isLoggedIn', value);

            if (value) {
                isLoggedIn = true;
            } else {
                isLoggedIn = false;
            }
        });

        console.log(isLoggedIn);

        if (!!isLoggedIn && this.authService.isStudent) {
            console.log('gebruiker mag leerling', this.authService.account);
            return true;
        } else {
            console.log('gebruiker mag niet leerling', this.authService.account);
            this.router.navigate(['login']);
            return false;
        }

    }
}
