import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Hardcoded for auth guard check (Task 75/76)
  public isLoggedIn: boolean = true;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
