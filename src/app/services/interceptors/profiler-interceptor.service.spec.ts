import { TestBed } from '@angular/core/testing';

import { ProfilerInterceptorService } from './profiler-interceptor.service';

describe('ProfilerInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilerInterceptorService = TestBed.get(ProfilerInterceptorService);
    expect(service).toBeTruthy();
  });
});
