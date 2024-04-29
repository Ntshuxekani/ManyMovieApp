import { Component, OnInit } from '@angular/core';
// import { MovieService } from '../services/movie.service';
import { MovieService } from 'src/app/services/movie-service.service';
@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  searchQuery: string = '';

  constructor(private movieService: MovieService) { }

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
}
