import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { ReviewService } from 'src/app/services/reviewmovie/review.service';

@Component({
  selector: 'app-review-movie',
  templateUrl: './review-movie.component.html',
  styleUrls: ['./review-movie.component.scss']
})
export class ReviewMovieComponent implements OnInit{
//public reviewForm!:FormGroup;
  commentText: string = '';
  reviewForm!: FormGroup;
  constructor(private reviewService: ReviewService,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      comment: new FormControl()
    });
  }
  submitReview() {
    if (this.commentText.trim()) {
      this.reviewService.submitReview(this.commentText).subscribe(
        response => {
          console.log('Review submitted successfully:', response);
        },
        error => {
          console.error('Error submitting review:', error);
        }
      );
    }
  }
}
