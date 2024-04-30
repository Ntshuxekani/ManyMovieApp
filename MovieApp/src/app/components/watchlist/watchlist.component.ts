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
    const userEmail = this.authService.getLoggedInUserEmail();
    this.watchlist = this.watchlistService.getWatchlist(userEmail);
    this.getMoviesDetails();
  }

  getMoviesDetails(): void {
    this.watchlist.forEach(id => {
      this.movieService.getMovieDetails(id).subscribe((data: any) => {
        this.movies.push(data);
      });
    });
  }

  removeFromWatchlist(imdbID: string): void {
    const userEmail = this.authService.getLoggedInUserEmail();
    this.watchlistService.removeFromWatchlist(userEmail, imdbID);
    this.movies = this.movies.filter(movie => movie.id !== imdbID);
  }

}
