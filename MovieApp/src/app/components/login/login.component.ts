import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  email: string | any;
  password: string | any;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onLogin() {
    this.authService.signin(this.email, this.password);
  }
  login(): void {
    this.http.get<any>("http://localhost:8080/api/login")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user) {
          alert('Login Successful');
          this.authService.signin(this.loginForm.value.email,this.loginForm.value.password); // Update user's authentication state
         
          this.loginForm.reset();
          this.router.navigate(["home"]); // Navigate to the desired page after login
        } else {
          alert("User not found");
        }
      }, err => {
        alert("Something went wrong");
      });
    }
  }