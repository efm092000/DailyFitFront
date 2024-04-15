import { TestBed } from '@angular/core/testing';

import { WeeklyService } from './weekly.service';

describe('WeeklyService', () => {
  let service: WeeklyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
