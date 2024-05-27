import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MovieCardComponent } from './components/moviecard/moviecard.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
// import { UserprofileComponent } from './userprofile/userprofile.component';


const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"register",component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"home",component:MovieCardComponent},
  { path: 'watchlist', component: WatchlistComponent },
  {path:'landing-page',component:LandingPageComponent},
  // {path:"profile",component:UserprofileComponent}
 

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }