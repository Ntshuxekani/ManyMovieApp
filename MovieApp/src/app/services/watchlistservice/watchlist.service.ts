import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlists: { [email: string]: string[] } = {};
  userId: number | null = null;


  constructor(private http:HttpClient) { }
  getWatchlist(email: string): string[] {
    if (!this.watchlists[email]) {
      this.watchlists[email] = [];
    }
    return this.watchlists[email];
  } 
  
  addToWatchlist(email: string, imdbID: any): void {
    // const userId = this.userId;
    // if (!userId) {
    //   console.error('User ID is missing.');
    //   return;
    // }

    console.log(email)
    if (!this.watchlists[email]) {
  
      this.watchlists[email] = [];
    }
    if (!this.watchlists[email].includes(imdbID)) {
      console.log(imdbID.id,imdbID.original_title);
      const movieId=imdbID.id;
     const movieTitle=imdbID.original_title;
      // const movieDesc=imdbID.overview;
      const movieRating=imdbID.vote_average
      const img=imdbID.poster_path;
      this.http.post('http://localhost:8080/api/v1/auth/movie',{id:movieId,title:movieTitle,rating:movieRating,image:img,user_email:email}).subscribe(response=>{console.log("movies added successfully");}, error=>{console.log("error",error);});
    }else{
      alert('movie added already');
      

    }
  }
// Removie the movie
  removeFromWatchlist(email: string, imdbID: any): void {
    if (!this.watchlists[email]) {
      return;
    }else
    {
      
    }
    this.watchlists[email] = this.watchlists[email].filter(id => id !== imdbID); //remove the specific movie and modify the array.
  } 

  isInWatchlist(email: string, imdbID: any): boolean {
    return this.watchlists[email] && this.watchlists[email].includes(imdbID); 
  }
}
