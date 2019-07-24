import { TestBed } from '@angular/core/testing';

import { HttpEncryptInterceptorService } from './handshake-interceptor.service';

describe('HandshakeInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpEncryptInterceptorService = TestBed.get(HttpEncryptInterceptorService);
    expect(service).toBeTruthy();
  });
});
