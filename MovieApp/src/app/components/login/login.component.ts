import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  email: string | any;
  password: string | any;
  private token: string |null=null;
  private userId: string | null = null;
  isLoggedIn: boolean = false;
  //private tokenExpirationTimer: any;

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

    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      // Proceed as if the user is logged in
      this.router.navigate(['/home']);
      // Optionally, you can also authenticate the user in your authService
      this.authService.login(this.email, token); // Assuming this method handles authentication
    } else {
      // Redirect the user to the login page
      this.router.navigate(['/login']);
    }
  }
  
  login(): void {
    this.http.post<{ token: string,userId: string }>("http://localhost:8080/api/v1/auth/login",this.loginForm.value)
      .subscribe(res => {
        const token = res.token;
      
        console.log(res)
        if (token) {
        this.token = token;
         localStorage.setItem('token', token);
        this.isLoggedIn = true;
        //get token from local storage
        localStorage.getItem('token')
        //if loggin is successful navigate to home page
        this.router.navigate(['/home']);
        this.authService.login(this.loginForm.value.email, token);
      }
    
      }, err => {
        alert("Something went wrong");
       });
       
    }
  }