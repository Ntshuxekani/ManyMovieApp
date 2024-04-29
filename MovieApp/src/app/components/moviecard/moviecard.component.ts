import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movieservice/movie-service.service';
import { WatchlistService } from 'src/app/services/watchlistservice/watchlist.service';
@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  searchQuery: string = '';

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
     this.movieService.getPopularMovies().subscribe((data:any)=>{
      this.movies=data.results;
     });
  }

  getMovies(searchQuery: string): void {
    this.movieService.searchMovies(searchQuery).subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  searchMovies(): void {
    this.getMovies(this.searchQuery);
  }
  addToWatchlist(imdbID: string): void {
    this.watchlistService.addToWatchlist(imdbID);
  }

  removeFromWatchlist(imdbID: string): void {
    this.watchlistService.removeFromWatchlist(imdbID);
  }

  isInWatchlist(imdbID: string): boolean {
    return this.watchlistService.isInWatchlist(imdbID);
  }
getWatchlist(): any[] {
    return this.watchlistService.getWatchlist();
  }
}
