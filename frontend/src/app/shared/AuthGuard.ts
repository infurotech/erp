import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private userSubject = new BehaviorSubject<any>(null); // Stores user info in memory


    constructor(private router: Router, private cookieService: CookieService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.isUserAuthenticated()) {
            return true; // ✅ User is authenticated based on token stored in memory
        } else {
            // Redirect to login page
            return this.router.createUrlTree(['/auth/login'], {
                queryParams: { returnUrl: state.url },
            });
        }
    }

    private isUserAuthenticated() {
        const token = this.getCookie('session_token');
        console.log('token',token);
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                this.userSubject.next(decodedUser);
                return true;
            } catch (err) {
                console.error('Invalid JWT:', err);
                this.userSubject.next(null);
            }
        }
        return false;
    }

    private getCookie(name: string): string | null {
        // console.log(document.cookie)
        // const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        // return match ? match[2] : null;
        console.log(this.cookieService.get(name))
        return this.cookieService.get(name);
    }
}
