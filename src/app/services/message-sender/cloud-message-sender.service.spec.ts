import { TestBed } from '@angular/core/testing';

import { CloudMessageSenderService } from './cloud-message-sender.service';

describe('CloudMessageSenderService', () => {
  let service: CloudMessageSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudMessageSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
