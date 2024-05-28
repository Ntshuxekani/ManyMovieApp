import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profileService/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  user: any = {
    firstName: '',
    email: '',
    password: ''
  };
  userId!: number;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    // this.userId = 1; 
    // this.getUserDetails();
  }

  getUserDetails(): void {
    this.profileService.getUserById(this.userId).subscribe(response => {
      this.user = response;
      console.log(this.user)
    }, error => {
      console.error('Error fetching user details', error);
    });
  }

  onSubmit(): void {
    this.profileService.updateUser(this.userId, this.user).subscribe(response => {
      console.log('User updated successfully', response);
    }, error => {
      console.error('Error updating user', error);
    });
  }
}
