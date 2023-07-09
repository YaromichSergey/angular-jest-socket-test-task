import { TestBed } from '@angular/core/testing';

import { FwefeService } from './fwefe.service';

describe('FwefeService', () => {
  let service: FwefeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FwefeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
