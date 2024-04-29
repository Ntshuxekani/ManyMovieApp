import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movieservice/movie-service.service';
import { WatchlistService } from 'src/app/services/watchlistservice/watchlist.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  movies: any[] = [];
  searchQuery: string = '';
  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) { }

  getMovies(searchQuery: string): void {
    this.movieService.searchMovies(searchQuery).subscribe((data: any) => {
      this.movies = data.results;
    });
  }
  searchMovies(): void {
    this.getMovies(this.searchQuery);
  }
  getWatchlist(): any[] {
    return this.watchlistService.getWatchlist();
  }
}
