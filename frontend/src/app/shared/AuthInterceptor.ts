import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './AuthService';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private allowedUnauthenticatedUrls = [
        '/api/auth/login',
        '/api/auth/refresh',
        '/api/auth/logout'];

    constructor(
        private router: Router,
        private messageService: MessageService,
        private cookieService: CookieService,
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.allowedUnauthenticatedUrls.includes(req.url)) {
            if (!this.cookieService.check('session_token')) {
                if (this.cookieService.check('refresh_token')) {
                    return this.refreshToken(req, next); // ✅ Refresh token if session_token is missing
                } else {
                    this.router.navigate(['/auth/login']);
                    return throwError(() => new Error('Redirecting to login.'));
                }
            }
        }
        return this.handleRequest(req, next);
    }

    private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(false);

            return this.authService.refreshToken().pipe(
                switchMap(() => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(true);
                    return this.handleRequest(request, next);
                }),
                catchError((err) => {
                    this.isRefreshing = false;
                    this.authService.logout();
                    return throwError(() => err);
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(refreshed => refreshed),
                take(1),
                switchMap(() => this.handleRequest(request, next))
            );
        }
    }

    private handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // ✅ Automatically send cookies with requests
        const clonedRequest = request.clone({ withCredentials: true });

        return next.handle(clonedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    if (!this.authService.isUserAuthenticated()) {
                        console.warn('🚨 Unauthorized! Redirecting to login...');
                        this.router.navigate(['/auth/login']);
                    } else {
                        this.messageService.add({ severity: 'error', detail: 'Unauthorized' });
                    }
                }
                return throwError(() => error);
            })
        );
    }
}
