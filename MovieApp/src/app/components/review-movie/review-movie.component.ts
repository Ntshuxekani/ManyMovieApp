import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewService } from 'src/app/services/reviewmovie/review.service';

@Component({
  selector: 'app-review-movie',
  templateUrl: './review-movie.component.html',
  styleUrls: ['./review-movie.component.scss']
})
export class ReviewMovieComponent {
  constructor(private reviewservice: ReviewService) { 
    
  }
Movies : any


    stars: number[] = [0,1, 2, 3, 4, 5];
    rating=0;
    comment: string ='';
  
    submitReview() {
      // Here you can add your submission logic, for example, sending the rating and comment to a server
      const reviewData = {
        rating: this.rating,
        comment: this.comment
      };
  
      // Assuming you have a service named "movieReviewService" to handle the submission
      this.reviewservice.submitReview(this.comment).subscribe(
        (response) => {
          // Handle successful submission
          console.log('Review submitted successfully:', response);
          // Reset the form after submission
          this.rating = 0;
          this.comment = '';
        },
        (error) => {
          // Handle error if submission fails
          console.error('Error submitting review:', error);
          // Optionally, you can display an error message to the user
        }
      );
    }
  
  }


