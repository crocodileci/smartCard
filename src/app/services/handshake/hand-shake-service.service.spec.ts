import { TestBed } from '@angular/core/testing';

import { HandShakeServiceService } from './hand-shake-service.service';

describe('HandShakeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandShakeServiceService = TestBed.get(HandShakeServiceService);
    expect(service).toBeTruthy();
  });
});
