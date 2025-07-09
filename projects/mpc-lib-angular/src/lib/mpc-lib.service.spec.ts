import { TestBed } from '@angular/core/testing';

import { MpcLibService } from './mpc-lib.service';

describe('MpcLibService', () => {
  let service: MpcLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpcLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
