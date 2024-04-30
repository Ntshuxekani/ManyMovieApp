import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchbarComponent } from './searchbar/searchbar.component';



const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full' },
  {path: 'login',component : LoginComponent},
  {path: 'register', component :RegisterComponent},
  {path: 'searchbar', component :SearchbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
