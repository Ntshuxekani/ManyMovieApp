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
 // constructor(){};
 public registerForm!:FormGroup;
email: any;
 
//email: any;
  constructor(private formBuilder:FormBuilder, private http: HttpClient,private router:Router){}
  ngOnInit(): void {
    console.log("component created");
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    });
    // if(this.registerForm.get('email')?.touched)
    // {
    //   console.log("email is touched");
    // }
  }
  passwordsMatch() {
    return this.registerForm.get('passwordConfirm')?.value != this.registerForm.get('password')?.value && this.registerForm.get('password')?.touched;
  }
 
   numUsers=0;
  register(){
   
    console.log("validationTest: ",this.registerForm.get('email')?.errors);
    this.http.get('http://localhost:3000/signupUsersList').toPromise().then(
      response=>{var numberOfUsers = response as any[];
        this.numUsers=numberOfUsers.length;
        console.log("after get-inside",this.numUsers);

        let newUser=this.registerForm.value;
        newUser["id"]=this.numUsers+1;
        console.log(newUser);
        console.log("after the get-inside",newUser);


        this.http.post<any>("http://localhost:3000/signupUsersList",newUser)
        .subscribe(res=>{
          alert("Registration Successfull");
         
          this.registerForm.reset();
          this.router.navigate(['landing-page']);// redirect to login page after signup
        },err=>{console.log("something is wrong");})
      });
      
    
  }
 
  }



