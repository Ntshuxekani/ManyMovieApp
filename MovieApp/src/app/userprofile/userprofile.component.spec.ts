import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
  })
  export class UserFormComponent implements OnInit {
    userForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.userForm = this.fb.group({
        firstName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      // Load user data here if you are updating existing user
      this.loadUserData();
    }
    loadUserData() {
        throw new Error('Method not implemented.');
    }
}
