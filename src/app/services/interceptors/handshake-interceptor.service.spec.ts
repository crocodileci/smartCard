import { TestBed } from '@angular/core/testing';

import { HandshakeInterceptorService } from './handshake-interceptor.service';

describe('HandshakeInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandshakeInterceptorService = TestBed.get(HandshakeInterceptorService);
    expect(service).toBeTruthy();
  });
});
