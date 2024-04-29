import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '50f3bba3274791adf6d76141851adb37';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  searchMovies(query: string): Observable<any> {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.http.get(url);
  }
}
