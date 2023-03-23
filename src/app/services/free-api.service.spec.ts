import { TestBed } from '@angular/core/testing';

import { FreeAPIService } from './free-api.service';

describe('FreeAPIService', () => {
  let service: FreeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
