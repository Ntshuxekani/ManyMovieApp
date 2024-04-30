import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public isLoggedIn: boolean = false;
  public userEmail: string = '';

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.http.get<any>("http://localhost:3000/signupUsersList")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user) {
          alert('Login Successful');
          this.userEmail = this.loginForm.value.email;
          this.isLoggedIn = true;
          this.loginForm.reset();
          this.router.navigate(["home"]);
        } else {
          alert("User not found");
        }
      }, err => {
        alert("Something went wrong");
      });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userEmail = '';
  }
}