import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
import { LoginService } from '../account/services/login.service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private userSubject = new BehaviorSubject<any>(null); // Stores user info in memory


    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.loginService.isUserAuthenticated()) {
            return true; // ✅ User is authenticated based on token stored in memory
        } else {
            // Redirect to login page
            return this.router.createUrlTree(['/auth/login'], {
                queryParams: { returnUrl: state.url },
            });
        }
    }
}
