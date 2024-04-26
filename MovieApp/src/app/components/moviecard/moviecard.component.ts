import { Component, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-card',
  template: `
    <div class="card">
      <img [src]="movie.poster" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text">{{ movie.description }}</p>
        <button *ngIf="!isInWatchlist(movie)" (click)="addToWatchlist(movie)" class="btn btn-primary">Add to Watchlist</button>
        <button *ngIf="isInWatchlist(movie)" (click)="removeFromWatchlist(movie)" class="btn btn-danger">Remove from Watchlist</button>
      </div>
    </div>
  `,
  styles: [`
    .card {
      width: 18rem;
      margin-bottom: 20px;
    }
  `]
})
export class MovieCardComponent {
  @Input() movie: any;

  constructor(private movieService: MovieService) { }

  isInWatchlist(movie: any): boolean {
    return this.movieService.getWatchlist().some(m => m.id === movie.id);
  }

  addToWatchlist(movie: any): void {
    this.movieService.addToWatchlist(movie);
  }

  removeFromWatchlist(movie: any): void {
    this.movieService.removeFromWatchlist(movie);
  }
}
