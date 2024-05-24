import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteWatchlistService {

  private apiUrl = 'http://localhost:8080/api/v1/auth/movie';

  constructor(private http: HttpClient) 
  {

  }

  deleteItem(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // Assuming your API endpoint for deleting items
    return this.http.delete(url);
  }

}
