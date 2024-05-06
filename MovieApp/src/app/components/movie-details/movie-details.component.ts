import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movieservice/movie-service.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: any;
  movieImages: any[] = [];
  similarMovies: any[] = [];
  currentSlide = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe((data: any) => {
        this.movieDetails = data;
      });

      this.movieService.getSimilarMovies(movieId).subscribe((data: any) => {
        this.similarMovies = data.results;
      });
      
    }
    
  }


}

