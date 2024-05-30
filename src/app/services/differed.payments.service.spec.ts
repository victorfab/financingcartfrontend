import { TestBed } from '@angular/core/testing';

import { DifferedPaymentsService } from './differed.payments.service';

describe('DifferedPaymentsService', () => {
  let service: DifferedPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifferedPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
