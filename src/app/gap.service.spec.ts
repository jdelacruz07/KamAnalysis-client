import { TestBed } from '@angular/core/testing';

import { GapService } from './gap.service';

describe('GapService', () => {
  let service: GapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
