import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    // Check if user is logged in by verifying JWT or session
    const token = localStorage.getItem('authToken');
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    // Decode the token and check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return expiry < Date.now() / 1000;
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
