import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {
  private apiKey = '7a4c1a70f94352c41f7fa71c363a37e8';
  constructor(private http: HttpClient){}

  login(username: string, password: string): Observable<any> {
    // Make an HTTP POST request to the server-side login endpoint
    return this.http.post<any>('https://api.example.com/login', { username, password });
  }

  getPopularMovies(): Observable<any> {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getMovies(): Observable<any> {
    let url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  searchMovies(query: string): Observable<any> {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.http.get(url);
  }
}