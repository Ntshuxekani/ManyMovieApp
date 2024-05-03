import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movieservice/movie-service.service';
import { WatchlistService } from 'src/app/services/watchlistservice/watchlist.service';
import { MovieCommunicationService } from 'src/app/services/MovieComservice/moviecomservice.service';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  searchQuery: string = '';
  userEmail: string = '';

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private movieCommunicationService: MovieCommunicationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results;
    });

    if (this.authService.getIsLoggedIn()) {
      this.userEmail = this.authService.getLoggedInUserEmail();
    }

    // Subscribe to changes in the search query
    this.movieCommunicationService.searchQuery$.subscribe(query => {
      if (query.trim() !== '') {
        this.getMovies(query);
      } else {
        this.movieService.getPopularMovies().subscribe((data: any) => {
          this.movies = data.results;
        });
      }
    });
  }

  getMovies(searchQuery: string): void {
    this.movieService.searchMovies(searchQuery).subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  addToWatchlist(imdbID: string): void {
    if (this.userEmail) {
      this.watchlistService.addToWatchlist(this.userEmail, imdbID);
    } else {
      alert('Please log in to add movies to your watchlist.');
    }
  }

  removeFromWatchlist(imdbID: string): void {
    if (this.userEmail) {
      this.watchlistService.removeFromWatchlist(this.userEmail, imdbID);
    }
  }

  isInWatchlist(imdbID: string): boolean {
    if (this.userEmail) {
      return this.watchlistService.isInWatchlist(this.userEmail, imdbID);
    }
    return false;
  }

  getWatchlist(): any[] {
    if (this.userEmail) {
      return this.watchlistService.getWatchlist(this.userEmail);
    }
    return [];
  }

  viewMovieDetails(movieId: string): void {
    // this.router.navigate(['details', movieId]);
    console.log("movie id :" +movieId)
    this.router.navigate(["/details",movieId]); // Navigate to the desired page after login

  }
}
