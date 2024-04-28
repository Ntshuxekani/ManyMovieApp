import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MovieCardComponent } from './moviecard/moviecard.component';

const routes: Routes = [
  {path:"", redirectTo:"register", pathMatch:"full"},
  {path:"register",component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"home",component:MovieCardComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
