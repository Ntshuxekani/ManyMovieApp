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
   // Subject for notifying authentication state changes

  constructor(private http:HttpClient, private router:Router) { }

  login(email: string, token: string): void {
    this.isLoggedIn = true;
    this.token = token;
    this.loggedInUserEmail = email;
    localStorage.setItem('loggedInUserEmail', email);
    localStorage
    this.authChanged.next(true); // Notify subscribers that authentication state has changed
  }
//   signin(email: string,password:string){
//     this.http.post<{ token: string }>('http://localhost:8080/api/v1/auth/login',{
//    "email":"Sm@gmail.com","password":"12345678"
// })
//       .subscribe(response => {
//         const token = response.token;
//         if (token) {
//           this.token = token;
//           // this.authStatusListener.next(true);
//           localStorage.setItem('token', token);
//           this.loggedInUserEmail = email;
//           localStorage.setItem('loggedInUserEmail', email);
//           this.router.navigate(['/landing-page']);
          

//         }
//       });
//   }

  logout(): void {
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

  // initAuth(): void {
  //   const userEmail = localStorage.getItem('loggedInUserEmail');
  //   const token = localStorage.getItem('token')
  //   if (userEmail && token) {
  //     this.login(userEmail, token);
  //     this.token=token;
  //     console.log('Login service this' + token)
  //   }
  // }
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
