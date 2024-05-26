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
  private userId:string | null=null;
  
  constructor(private http:HttpClient, private router:Router) { }

  login(email: string, password: string): void {
    this.http.post<{ token: string, userId: string }>('http://localhost:8080/api/v1/auth/login', { email, password })
    .subscribe(res => {
      const { token, userId } = res;
      if (token && userId) {
    this.isLoggedIn = true;
    this.token = token;
    this.loggedInUserEmail = email;
    this.userId = userId;
    localStorage.setItem('token', token);
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('userId', userId);
    this.authStatusListener.next(true);
    this.authChanged.next(true);
    this.router.navigate(['/home']);
      }
    },err => {
      alert('Something went wrong');
    });
}

  logout(): void {
    this.userId=null;
    this.isLoggedIn = false;
    this.token = null;
    this.loggedInUserEmail = '';
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.authStatusListener.next(false);
    this.authChanged.next(false);
    this.router.navigate(['/login']);
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
  getUserId():string|null{
    return this.userId
  }

  initAuth(): void {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (userEmail && token && userId) {
      this.token = token;
      this.isLoggedIn = true;
      this.loggedInUserEmail = userEmail;
      this.userId = userId;
      this.authStatusListener.next(true);
    } else {
      this.logout();
    }
  }
}
