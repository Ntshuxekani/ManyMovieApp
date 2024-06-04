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
  userId: number | null = null;
  movies:any[]=[];


  constructor(private http:HttpClient,private auth:AuthService) {
    this.auth.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userId=this.auth.getUserId();
    });

  }
  getMoviesByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/user/${userId}`);
  }
  deleteMoviesByUserId(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/user/${userId}`);
  }
 // /api/v1/auth/movie/user/{id}

  getWatchlist(email: string): string[] {
    if (!this.watchlists[email]) {
      this.watchlists[email] = [];
    }
    // this.http.get(`${this.url}/user/${this.userId}`)
    // .subscribe(response=>{console.log(response);   
    // },
    //  error=>{console.log("error",error);});
    
    return this.watchlists[email];
    
  } 
  
  addToWatchlist(imdbID: any): void {
    console.log("id id" + imdbID.id)
    console.log(imdbID)
    const email= '';
    const userId = this.userId;
    if (!userId) {
      console.error('User ID is missing.');
      return;
    }
    
      console.log(imdbID.id,imdbID.original_title);
    const { id, original_title, overview, poster_path, vote_average } = imdbID;
    console.log("the movie details id" + id)
 
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
      console.log("the movie details" + imdbID)
      console.log(userId)
      this.http.post(`${this.url}/${userId}`,requestBody).subscribe(response=>{console.log(response);}, error=>{console.log("error",error);});
    // }else{
    //   alert('movie added already');
      

    // }
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
