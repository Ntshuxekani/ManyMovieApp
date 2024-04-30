import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieCommunicationService } from 'src/app/services/MovieComservice/moviecomservice.service';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';

@Component({
 selector: 'app-navbar',
 templateUrl: './navbar.component.html',
 styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 isLoggedIn: boolean = false;
 userEmail: string = '';
 searchQuery: string = '';

 constructor(private authService: AuthService,private movieCommunicationService: MovieCommunicationService , private router: Router) { }

 ngOnInit(): void {
   this.authService.authChanged.subscribe((isLoggedIn: boolean) => {
     this.isLoggedIn = isLoggedIn;
     if (this.isLoggedIn) {
       this.userEmail = this.authService.getLoggedInUserEmail();
     } else {
       this.userEmail = '';
     }
   });

   this.isLoggedIn = this.authService.getIsLoggedIn();
   if (this.isLoggedIn) {
     this.userEmail = this.authService.getLoggedInUserEmail();
   }
 }

 logout(): void {
   this.authService.logout();
   this.router.navigate(['/login']); // Redirect to login page after logout
 }

 searchMovies(): void {
   this.movieCommunicationService.setSearchQuery(this.searchQuery); // Use the service to set the search query
 }

 navigateHome(): void {
   this.router.navigate(['/home']);
 }
}
