import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  latestMovies = [
    { title: 'Movie 1', year: 2022, director: 'Director 1' },
    { title: 'Movie 2', year: 2023, director: 'Director 2' },
    { title: 'Movie 3', year: 2024, director: 'Director 3' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
