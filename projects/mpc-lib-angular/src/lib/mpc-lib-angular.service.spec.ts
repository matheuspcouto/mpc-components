import { TestBed } from '@angular/core/testing';

import { MpcLibAngularService } from './mpc-lib-angular.service';

describe('MpcLibAngularService', () => {
  let service: MpcLibAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpcLibAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
