import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserprofileService } from '../userprofile.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userprofileService: UserprofileService) {
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

  loadUserData(): void {
    // Fetch user data from the service and patch the form values
    this.userprofileService.getUser().subscribe(data => {
      this.userForm.patchValue(data);
      console.log(data)
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userprofileService.updateUser(this.userForm.value).subscribe(response => {
        console.log('User updated successfully');
      });
    }
  }
}
