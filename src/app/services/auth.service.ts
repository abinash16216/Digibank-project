import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string | null = null; // Store the attempted URL

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false; // Clear authentication-related data
    this.redirectUrl = null; // Clear stored redirect URL
    this.router.navigate(['/login']); // Navigate to login page
  }
}
