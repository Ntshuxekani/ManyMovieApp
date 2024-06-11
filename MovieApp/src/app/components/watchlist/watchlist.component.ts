import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { WatchlistService } from 'src/app/services/watchlistservice/watchlist.service';
import { MovieService } from 'src/app/services/movieservice/movie-service.service';
import { DeleteWatchlistService } from 'src/app/services/delete-watchlist.service';

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
    private movieService: MovieService,
    private deleteWatchlistService: DeleteWatchlistService
  ) { }

  ngOnInit(): void {
   
    const userId = this.authService.getUserId(); // Assuming you have this method
    this.watchlistService.getMoviesByUserId(userId).subscribe((data: any[]) => {
      this.movies = data;
      
    });
  }

  removeFromWatchlist(movieId: any): void {
    this.watchlistService.deleteMovie(movieId).subscribe(
      () => {
        alert('Movie removed successfully');
        window.location.reload();
        // Optionally, update the UI to reflect the deletion
      },
      error => {
        console.error('Error removing movie', error);
      }
    );
    

}}
