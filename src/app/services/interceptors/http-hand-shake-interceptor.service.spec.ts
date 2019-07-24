import { TestBed } from '@angular/core/testing';

import { HttpHandShakeInterceptorService } from './http-hand-shake-interceptor.service';

describe('HttpHandShakeInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpHandShakeInterceptorService = TestBed.get(HttpHandShakeInterceptorService);
    expect(service).toBeTruthy();
  });
});
