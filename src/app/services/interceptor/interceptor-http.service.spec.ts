import { TestBed } from '@angular/core/testing';

import { InterceptorHttpService } from './interceptor-http.service';

describe('InterceptorHttpService', () => {
  let service: InterceptorHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
