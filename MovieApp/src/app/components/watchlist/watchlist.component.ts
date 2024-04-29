import { Component, OnInit } from '@angular/core';
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
    private watchlistService: WatchlistService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.watchlist = this.watchlistService.getWatchlist();
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
    this.watchlistService.removeFromWatchlist(imdbID);
    this.movies = this.movies.filter(movie => movie.imdbID !== imdbID)[0  ];
  }

}
