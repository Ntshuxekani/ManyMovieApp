import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviePageComponent } from './moviepage.component';


describe('MoviepageComponent', () => {
  let component: MoviePageComponent;
  let fixture: ComponentFixture<MoviePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviePageComponent]
    });
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
