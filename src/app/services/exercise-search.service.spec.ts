import { TestBed } from '@angular/core/testing';

import { ExerciseSearchService } from './exercise-search.service';

describe('ExerciseSearchService', () => {
  let service: ExerciseSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
