import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent,} from './navbar/navbar.component';
import { ReviewMovieComponent } from './components/review-movie/review-movie.component';

const routes: Routes = [
  {path:"", redirectTo:"navbar", pathMatch:"full"},
  {path:"navbar", component:NavbarComponent},
  {path:"review-movie", component:ReviewMovieComponent}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
