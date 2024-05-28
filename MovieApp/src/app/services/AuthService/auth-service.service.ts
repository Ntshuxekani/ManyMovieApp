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
  

  private isLoggedIn: boolean = false;
  private loggedInUserEmail: string = '';
  authChanged = new Subject<boolean>();
  // private user_id?: string | undefined;
  private user_id: any;
   // Subject for notifying authentication state changes

  constructor(private http:HttpClient, private router:Router) { }

  login(email: string, token: string): void {
    this.user_id = this.extractUserIdFromToken(token); // Extract and store the user ID
    console.log(this.user_id);
    this.isLoggedIn = true;
    this.token = token;
    console.log('login the'+ token);
    this.loggedInUserEmail = email;
    localStorage.setItem('loggedInUserEmail', email);
    localStorage
    this.authChanged.next(true); // Notify subscribers that authentication state has changed
  }

  logout(): void {
    this.user_id=null;
    this.isLoggedIn = false;
    this.token = null;
    this.loggedInUserEmail = '';
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('token');
    this.authChanged.next(false);
    this.router.navigate(['/login']); // Notify subscribers that authentication state has changed
  }

  getToken(): string | null {
    return this.token;
    console.log(this.token);
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
