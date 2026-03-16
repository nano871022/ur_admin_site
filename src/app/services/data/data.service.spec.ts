import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientService } from '@services/interceptor/http-client-service.service';

describe('DataService', () => {
  let service: DataService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['fetchAuth']);

    TestBed.configureTestingModule({
      providers: [
        DataService,
        { provide: HttpClientService, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
