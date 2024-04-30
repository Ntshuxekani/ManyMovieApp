import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  logout(): void {
    // Clear any stored authentication token or session
    // For example, you might use localStorage or sessionStorage to store tokens
    localStorage.removeItem('authToken');
    // Perform any other cleanup tasks if necessary
  }
}

