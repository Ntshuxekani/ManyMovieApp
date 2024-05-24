import { TestBed } from '@angular/core/testing';

import { DeleteWatchlistService } from './delete-watchlist.service';

describe('DeleteWatchlistService', () => {
  let service: DeleteWatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteWatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
