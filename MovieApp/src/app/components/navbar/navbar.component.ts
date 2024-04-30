import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { MovieCommunicationService } from 'src/app/services/MovieComservice/moviecomservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userEmail: string = '';
  searchQuery: string = '';

  constructor(private authService: AuthService,private movieCommunicationService: MovieCommunicationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.initAuth(); // Initialize authentication state
    this.isLoggedIn = this.authService.getIsLoggedIn();
    if (this.isLoggedIn) {
      this.userEmail = this.authService.getLoggedInUserEmail();
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userEmail = '';
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  searchMovies(): void {
    this.movieCommunicationService.setSearchQuery(this.searchQuery); // Use the service to set the search query
  }
  
  navigateHome(): void {
    this.router.navigate(['/home']);
  }
}

