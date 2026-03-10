import { TestBed } from '@angular/core/testing';
import { HttpClientService } from './http-client-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let mockAngularFireAuth: any;

  beforeEach(() => {
    mockAngularFireAuth = {
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve())
    };

    TestBed.configureTestingModule({
      providers: [
        HttpClientService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }
      ]
    });
    service = TestBed.inject(HttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
