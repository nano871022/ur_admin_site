import { TestBed } from '@angular/core/testing';
import { GetTokenService } from './get-token.service';
import { HttpClientService } from '@services/interceptor/http-client-service.service';

describe('GetTokenService', () => {
  let service: GetTokenService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['fetchBasic']);

    TestBed.configureTestingModule({
      providers: [
        GetTokenService,
        { provide: HttpClientService, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(GetTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
