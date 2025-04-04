// src/app/services/property.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = '/api/auth'; private
  userSubject = new BehaviorSubject<any>(null); // Stores user info in memory

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  } 
  
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, { withCredentials: true });
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh`, { withCredentials: true });
  }
  
  isUserAuthenticated() {
    const token = this.getCookie('session_token');
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
    return this.cookieService.get(name);
  }
}
