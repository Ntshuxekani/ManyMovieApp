import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-movie',
  templateUrl: './review-movie.component.html',
  styleUrls: ['./review-movie.component.scss']
})
export class ReviewMovieComponent {
  public reviewForm!:FormGroup;
  email: any;
   
  //email: any;
    constructor(private formBuilder:FormBuilder, private http: HttpClient,private router:Router){}
    ngOnInit(): void {
      console.log("component created");
      this.reviewForm = this.formBuilder.group({
      
      });
      // if(this.registerForm.get('email')?.touched)
      // {
      //   console.
}
onSubmit(){

}
}
