import { TestBed } from '@angular/core/testing';

import { JWTToken } from './jwttoken';

describe('JWTTokenService', () => {
  let service: JWTToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWTToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
