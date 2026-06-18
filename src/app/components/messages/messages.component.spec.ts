import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponent } from './messages.component';
import { CloudMessageSenderService } from '@services/message-sender/cloud-message-sender.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let senderSvcMock: any;

  beforeEach(async () => {
    senderSvcMock = {
      send: jasmine.createSpy('send').and.returnValue(Promise.resolve({ description: 'Success' }))
    };

    await TestBed.configureTestingModule({
      imports: [MessagesComponent, NoopAnimationsModule],
      providers: [
        { provide: CloudMessageSenderService, useValue: senderSvcMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
