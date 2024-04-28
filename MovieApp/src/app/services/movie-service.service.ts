import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getMovies(searchQuery: string, sortBy: string): Observable<any> {
    let url = `https://www.omdbapi.com/?apikey=f45065da&s=${searchQuery}&type=movie&plot=short`;
    if (sortBy === 'latest') {
      url += '&y=2024'; // Assuming you want to get the latest movies of 2024
    }
    
    // Add more conditions for other sorting options if needed
    return this.http.get(url);
  }
}
