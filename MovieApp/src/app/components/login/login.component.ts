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
  isLoggedIn: boolean = false;
  private tokenExpirationTimer: any;

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
  // onLogin() {
  //   if(this.loginForm.valid){
  //     const email=this.loginForm.value.email;
  //     const password=this.loginForm.value.password;
  //   this.authService.signin(this.email, this.password);
  // }}
  login(): void {
    this.http.post<{ token: string }>("http://localhost:8080/api/v1/auth/login",this.loginForm.value)
      .subscribe(res => {
        const token = res.token;
        if (token) {
        this.token = token;
        this.startTokenExpirationTimer();
        localStorage.setItem('token', token);
        this.isLoggedIn = true;
        localStorage.getItem('token')
        this.router.navigate(['/home']);
        this.authService.login(this.loginForm.value.email, token);
      }
      //   const user = res.find((a: any) => {
      //     return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      //   });
      //   if (user) {
      //     alert('Login Successful');
      //     this.authService.login(this.loginForm.value.email); // Update user's authentication state
         
      //     this.loginForm.reset();
      //     this.router.navigate(["home"]); // Navigate to the desired page after login
      //   } else {
      //     alert("User not found");
      //   }
      }, err => {
        alert("Something went wrong");
       });
       
    }
    private startTokenExpirationTimer(): void {
      const tokenExpirationTime = 30 * 1000; // 30 seconds
      this.tokenExpirationTimer = timer(tokenExpirationTime).subscribe(() => {
        this.token = null;
        localStorage.removeItem('token');
        // Display modal or perform other actions here
        alert("Login session has expired...")
        this.authService.logout();
      });
    }
  }