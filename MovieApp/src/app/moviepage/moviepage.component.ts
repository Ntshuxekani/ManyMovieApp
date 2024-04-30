import { Component, OnInit } from '@angular/core';
import { MovieserviceService } from '../services/movieservice.service';


@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.scss']
})


export class MoviePageComponent implements OnInit {
  showEntireCast: boolean = false;
  moviePictures: string[] = ['url_to_image1', 'url_to_image2', 'url_to_image3']; // Placeholder URLs for movie pictures
  similarMovies: any[] = [
    { title: 'Movie 1', poster: 'url_to_poster1', description: 'Description of Movie 1' },
    { title: 'Movie 2', poster: 'url_to_poster2', description: 'Description of Movie 2' },
    { title: 'Movie 3', poster: 'url_to_poster3', description: 'Description of Movie 3' }
  ]; // Placeholder data for similar movies
  searchTerm: string = '';

  constructor( private movieService : MovieserviceService) { }
  
  ngOnInit(): void {
    // Fetch movie details and similar movies when component initializes
    // You can implement this logic using a service to fetch data from an API


    this.movieService.getMovies().subscribe(
      (response: any) => {
      console.log(response)
      console.log("Movies")
      }
    )
    // this.movieService.getPopularMovies().subscribe((data:any)=>{
    //   this.similarMovies=data.results;
    // });

  }

}

