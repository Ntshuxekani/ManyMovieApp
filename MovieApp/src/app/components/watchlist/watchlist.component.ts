import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { WatchlistService } from 'src/app/services/watchlistservice/watchlist.service';
import { MovieService } from 'src/app/services/movieservice/movie-service.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];
  movies: any[] = [];

  constructor(
    private authService: AuthService,
    private watchlistService: WatchlistService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    // const userEmail = this.authService.getLoggedInUserEmail();
    // this.watchlist = this.watchlistService.getWatchlist(userEmail);
    // this.getMoviesDetails();
    const userId = this.authService.getUserId(); // Assuming you have this method
    this.watchlistService.getMoviesByUserId(userId).subscribe((data: any[]) => {
      this.movies = data;
    });
  }

  removeFromWatchlist(movieId: any): void {
    this.watchlistService.deleteMovie(movieId).subscribe(
      () => {
        console.log('Movie removed successfully');
        window.location.reload();
        // Optionally, update the UI to reflect the deletion
      },
      error => {
        console.error('Error removing movie', error);
      }
    );


  //   const userEmail = this.authService.getLoggedInUserEmail();
  //   const userId = this.authService.getUserId(); // Assuming you have this method
  //   this.watchlistService.deleteMovie().subscribe((data: any[]) => {
  //     this.movies = data;
  //     //this.movies = this.movies.filter(movie => movie.id !== imdbID);

     
  //   });

  // //   this.watchlistService.removeFromWatchlist(userEmail, imdbID);
  // //   this.movies = this.movies.filter(movie => movie.id !== imdbID);
  // }

}}
