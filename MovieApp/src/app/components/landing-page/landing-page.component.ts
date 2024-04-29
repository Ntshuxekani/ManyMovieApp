import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Landing page component
 */

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateTo() {
    this.router.navigate(['/watchlist']);
  }
}
