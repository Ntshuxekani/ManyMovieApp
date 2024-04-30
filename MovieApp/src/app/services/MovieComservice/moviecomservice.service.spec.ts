import { TestBed } from '@angular/core/testing';

import { MoviecomserviceService } from './moviecomservice.service';

describe('MoviecomserviceService', () => {
  let service: MoviecomserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviecomserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
