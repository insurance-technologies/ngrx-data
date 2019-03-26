import { TestBed } from '@angular/core/testing';

import { NgrxDataLibService } from './ngrx-data-lib.service';

describe('NgrxDataLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgrxDataLibService = TestBed.get(NgrxDataLibService);
    expect(service).toBeTruthy();
  });
});
