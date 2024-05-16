import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlists: { [email: string]: string[] } = {};

  constructor(private http: HttpClient) { }

  // getWatchlist(email: string): string[] {
  //   if (!this.watchlists[email]) {
  //     this.watchlists[email] = [];
  //   }
  //   return this.watchlists[email];
  // }
  getWatchlist(email: string): string[] {
    if (!this.watchlists[email]) {
      this.watchlists[email] = [];
    }
    return this.watchlists[email];
  }


  addToWatchlist(email: string, imdbID: any): void {
    if (!this.watchlists[email]) {
      this.watchlists[email] = [];
    }
    if (!this.watchlists[email].includes(imdbID)) {
      // const movName = imdbID.title;
      console.log(imdbID.id,imdbID.overview,imdbID.vote_average,imdbID.poster_path);
      const movieId=imdbID.id;
      const movieTitle=imdbID.original_title;
      const movieDesc=imdbID.overview;
      const movieRating=imdbID.vote_average
      const img=imdbID.poster_path;
      this.http.post('http://localhost:8080/api/v1/movie',{id:movieId,title:movieTitle,description:movieDesc,rating:movieRating,image:img}).subscribe(response=>{console.log("movies added:",response);}, error=>{console.log("error",error);});
    }else{
      alert('movie added already');
      
    }
      
      // this.watchlists[email].push(imdbID);
    }
  

  removeFromWatchlist(email: string, imdbID: string): void {
    
    if (!this.watchlists[email]) {
      return;
    }
    this.watchlists[email] = this.watchlists[email].filter(id => id !== imdbID);
  }

  isInWatchlist(email: string, imdbID: string): boolean {
    
    return this.watchlists[email] && this.watchlists[email].includes(imdbID);
  }
}
