import { TestBed } from '@angular/core/testing';

import { HttpDecryptInterceptorService } from './http-decrypt-interceptor.service';

describe('HttpDecryptInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpDecryptInterceptorService = TestBed.get(HttpDecryptInterceptorService);
    expect(service).toBeTruthy();
  });
});
