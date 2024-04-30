import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Call the logout method from AuthService
    this.authService.logout();
    // Navigate to the login page
    this.router.navigate(['/login']);
}





  }

