import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie-service.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  searchControl: FormControl = new FormControl('');
  sortBy: string = 'latest'; // Default sorting by latest

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies(''); // Load initial movies on component initialization

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchQuery: string) => {
        this.getMovies(searchQuery);
      });
  }

  // getMovies(searchQuery: string): void {
  //   this.movieService.getMovies(searchQuery, this.sortBy).subscribe((data: any) => {
  //     this.movies = data.Search;
  //   });
  // }
  
  getMovies(searchQuery: string): void {
    this.movieService.getMovies(searchQuery, this.sortBy).subscribe((data: any) => {
      if (data.Response === 'True') {
        this.movies = data.Search;
      } else {
        console.error(data.Error);
        this.movies = []; // Set movies to empty array or handle the error appropriately
      }
    });
  }
  
  

  sortMoviesBy(sortBy: string): void {
    this.sortBy = sortBy;
    this.getMovies(this.searchControl.value);
  }
}
