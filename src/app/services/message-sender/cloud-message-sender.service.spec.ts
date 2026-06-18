import { TestBed } from '@angular/core/testing';
import { CloudMessageSenderService } from './cloud-message-sender.service';
import { HttpClientService } from '@services/interceptor/http-client-service.service';

describe('CloudMessageSenderService', () => {
  let service: CloudMessageSenderService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['fetchAuth']);

    TestBed.configureTestingModule({
      providers: [
        CloudMessageSenderService,
        { provide: HttpClientService, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(CloudMessageSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
