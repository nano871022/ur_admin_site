import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { AuthenticationComponent } from './authentication.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GetTokenService } from '@services/tokens/get-token.service';
import { of } from 'rxjs';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let angularFireAuthMock: any;
  let routerMock: any;
  let getTokenServiceMock: any;

  beforeEach(async () => {
    angularFireAuthMock = {
      onAuthStateChanged: jasmine.createSpy('onAuthStateChanged').and.returnValue(Promise.resolve(null)),
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve())
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
      url: '/'
    };
    getTokenServiceMock = {
      getToken: jasmine.createSpy('getToken').and.returnValue(Promise.resolve('token'))
    };

    await TestBed.configureTestingModule({
      imports: [AuthenticationComponent],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthMock },
        { provide: Router, useValue: routerMock },
        { provide: GetTokenService, useValue: getTokenServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    tick(1000);
    discardPeriodicTasks();
  }));
});
