import { TestBed } from '@angular/core/testing';
import { HttpClientService } from './http-client-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let afAuthSpy: any;

  beforeEach(() => {
    afAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['signOut']);

    TestBed.configureTestingModule({
      providers: [
        HttpClientService,
        { provide: AngularFireAuth, useValue: afAuthSpy }
      ]
    });
    service = TestBed.inject(HttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
