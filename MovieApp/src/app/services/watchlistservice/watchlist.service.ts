import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../AuthService/auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private url='http://localhost:8080/api/v1/auth/movie';
  private watchlists: { [email: string]: string[] } = {};
  userId: string | null = null;
  movies:any[]=[];


  constructor(private http:HttpClient,private auth:AuthService) {
    this.auth.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userId=this.auth.getUserId();
    });

  }
  getMoviesByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/user/${userId}`);
  }
  
  deleteMovie(movieId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/movie/${movieId}`);
  }
 // /api/v1/auth/movie/user/{id}

  getWatchlist(email: string): string[] {
    if (!this.watchlists[email]) {
      this.watchlists[email] = [];
    }
  
    
    return this.watchlists[email];
    
  } 
  
  addToWatchlist(imdbID: any): void {
    const email= '';
    if (this.isInWatchlist(email, imdbID)) {
      console.log('Movie already exists in the watchlist.');
      return;
    }
    const userId = this.userId;
    if (!userId) {

      alert('You have not logged in, please log in...');
      
      return;
    }
    if (this.isInWatchlist(userId, imdbID)) {
      alert('Movie already exists in the watchlist.');
      return;
    }
      console.log(imdbID.id,imdbID.original_title);

    const { id, original_title, overview, poster_path, vote_average } = imdbID;

 
      const requestBody = {
        id,
        title: original_title,
        image: poster_path,
        rating: vote_average,
        description: overview,
       user:{
        id:userId
       }// Add userId to the request body

      };
      this.http.post(`${this.url}/${userId}`,requestBody)
      .subscribe(response=>{console.log(response);
      if (!this.watchlists[userId]) {
          this.watchlists[userId] = [];
        }
        this.watchlists[userId].push(imdbID);
      },
      error=>{console.log("error",error);});
    // }else{
    //   alert('movie added already');
      

    // }
  }
// Removie the movie
  removeFromWatchlist(email: string, imdbID: any): void {
    
    this.http.delete(`${this.url}/`).subscribe(response => {
      console.log("Movie removed successfully");
    }, error => {
      console.log("Error removing movie", error);
    });
  
  }

  isInWatchlist(email: string, imdbID: any): boolean {
    return this.watchlists[email] && this.watchlists[email].includes(imdbID); 
    
  }
}
