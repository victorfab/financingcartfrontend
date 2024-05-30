import { TestBed } from '@angular/core/testing';

import { DifferService } from './differ.service';

describe('DifferService', () => {
  let service: DifferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
