import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 // constructor(){};
 public registerForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private http: HttpClient,private router:Router){}
  ngOnInit(): void {
    console.log("component created");
    this.registerForm=this.formBuilder.group({
      name:[''],
      email:[''],
      password:[''],
      })
  }
  register(){
    this.http.post<any>("http://localhost:3000/register",this.registerForm.value)
    .subscribe(res=>{
      alert("Registration Successfull");
      this.registerForm.reset();
      this.router.navigate(['landing-page']);// redirect to login page after signup
    },err=>{console.log("something is wrong");})
  }

  // registerForm=this.fb.group({
  //   name:['',[Validators.required]],
  //   email:['',[Validators.required,Validators.email]],
  //   password:['',[Validators.required]]
  // })
//   constructor(private fb:FormBuilder){}
// get email(){
//   return this.registerForm.controls['email'];
// }
// get password(){
//   return this.registerForm.controls['password'];
// }
}


