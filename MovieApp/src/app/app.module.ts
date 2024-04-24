import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReviewMovieComponent } from './components/review-movie/review-movie.component';

const routes: Routes=[
  {path: 'review-movie',
component: ReviewMovieComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ReviewMovieComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
