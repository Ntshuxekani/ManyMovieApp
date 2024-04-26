import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-watchlist',
  template: `
    <h2>My Watchlist</h2>
    <button (click)="sortWatchlistByTitle()">Sort by Title</button>
    <button (click)="sortWatchlistByRating()">Sort by Rating</button>
    <div *ngFor="let movie of watchlist">
      <!-- <app-movie-card [movie]="movie"></app-movie-card> -->
      
    </div>
  `
})
export class WatchlistComponent {
  watchlist: any[];

  constructor(private movie: MovieService) {
    this.watchlist = this.movie.getWatchlist();
  }

  sortWatchlistByTitle(): void {
    this.movie.sortWatchlistByTitle();
    this.watchlist = this.movie.getWatchlist();
  }

  sortWatchlistByRating(): void {
    this.movie.sortWatchlistByRating();
    this.watchlist = this.movie.getWatchlist();
  }
}
