import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  submitReview(comment: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reviews`, { comment });
  }
}