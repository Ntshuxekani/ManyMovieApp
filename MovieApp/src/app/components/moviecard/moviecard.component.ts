// moviecard.component.ts
import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movieservice/movie-service.service';
import { WatchlistService } from 'src/app/services/watchlistservice/watchlist.service';
import { MovieCommunicationService } from 'src/app/services/MovieComservice/moviecomservice.service';
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
    private watchlistService: WatchlistService,
    private movieCommunicationService: MovieCommunicationService // Inject the communication service
  ) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((data:any)=>{
      this.movies=data.results;
    });

    // Subscribe to changes in the search query
    this.movieCommunicationService.searchQuery$.subscribe(query => {
      if (query.trim() !== '') {
        this.getMovies(query);
      } else {
        this.movieService.getPopularMovies().subscribe((data:any)=>{
          this.movies=data.results;
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