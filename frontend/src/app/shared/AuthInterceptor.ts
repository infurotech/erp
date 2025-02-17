import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../account/services/login.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private router: Router, private messageService: MessageService, private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // ✅ Ensure all requests include credentials (cookies)
        const clonedRequest = req.clone({
            withCredentials: true, // ✅ Automatically send cookies with requests
        });

        return next.handle(clonedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    if (!this.loginService.isUserAuthenticated()) {
                        // ✅ Redirect to login if unauthorized
                        console.warn('🚨 Unauthorized! Redirecting to login...');
                        this.router.navigate(['/auth/login']);
                    }
                    else{
                        this.messageService.add({ severity:'error', detail: 'Unauthorized' });
                    }
                }
                return throwError(() => error);
            })
        );
    }
}
