import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profileService/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  userForm!: FormGroup;
  userId!: any

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.initForm();
      this.getUserDetails();
    });
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getUserDetails(): void {
    this.profileService.getUserById(this.userId).subscribe(response => {
      this.userForm.patchValue(response);
    }, error => {
      console.error('Error fetching user details', error);
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const user = this.userForm.value;
    this.profileService.updateUser(this.userId, user).subscribe(response => {
      console.log('User updated successfully', response);
    }, error => {
      console.error('Error updating user', error);
    });
  }
}
