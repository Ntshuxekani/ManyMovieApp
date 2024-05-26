import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
 public registerForm!:FormGroup;
email: any;
 
  constructor(private formBuilder:FormBuilder, private http: HttpClient,private router:Router){}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  passwordsMatch() {
    return this.registerForm.get('confirmPassword')?.value != this.registerForm.get('password')?.value && this.registerForm.get('password')?.touched;
  }
 
   numUsers=0;
  register(){
    if (this.registerForm.valid) {
        let newUser=this.registerForm.value;
        newUser["id"]=this.numUsers+1;

        this.http.post<any>("http://localhost:8080/api/v1/auth/register",newUser)
        .subscribe(res=>{
          alert("Registration Successfull");
         
          this.registerForm.reset();
          this.router.navigate(['home']);
        },err=>{console.log("something is wrong");})
      
    
  }
 
  }
}


