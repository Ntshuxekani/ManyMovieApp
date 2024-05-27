import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  UserprofileService {

  private apiUrl = 'http://localhost:8080/api/v1/auth/register'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/{id}`); // Replace with actual user ID
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/{id}`, user); // Replace with actual user ID
  }
}
