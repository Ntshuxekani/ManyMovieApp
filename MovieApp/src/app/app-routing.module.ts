import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MovieCardComponent } from './components/moviecard/moviecard.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"register",component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"home",component:MovieCardComponent},
  { path: 'watchlist', component: WatchlistComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
