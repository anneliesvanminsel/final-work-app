
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

        if(this.authService.isLoggedIn && this.authService.isStudent) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }

    }
}
