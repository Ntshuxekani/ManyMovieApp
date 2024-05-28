import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string |null=null;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  

  private isLoggedIn: boolean = false;
  private loggedInUserEmail: string = '';
  authChanged = new Subject<boolean>();
  // private user_id?: string | undefined;
  private user_id: any;
   // Subject for notifying authentication state changes

  constructor(private http:HttpClient, private router:Router) { }

  login(email: string, token: string): void {
    this.user_id = this.extractUserIdFromToken(token); // Extract and store the user ID
    this.isLoggedIn = true;
    this.token = token;
    this.loggedInUserEmail = email;
    localStorage.setItem('loggedInUserEmail', email);
    this.isLoggedInSubject.next(true);
    this.isLoggedInSubject.next(true);
    this.authChanged.next(true); // Notify subscribers that authentication state has changed
  }

  logout(): void {
    // login is initialy set to false
    this.isLoggedIn = false;
    this.token = null;
    this.loggedInUserEmail = '';
    localStorage.removeItem('loggedInUserEmail');
    //clear the token if a user logged out
    localStorage.removeItem('token');
    this.authChanged.next(false);
    this.isLoggedInSubject.next(false);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']); // Notify subscribers that authentication state has changed
  }

  getToken(): string | null {
    return this.token;
   
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }



  getLoggedInUserEmail(): string {
    return this.loggedInUserEmail;
  }
  getUserId(){
    return this.user_id
  }

  private extractUserIdFromToken(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || null; // Assuming the user ID is stored in the "id" field
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  initAuth(): void {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    const token = localStorage.getItem('token');
    if (userEmail && token) {
      this.login(userEmail, token);
    } else {
      console.log('No token found in local storage.');
    }
  }
}
