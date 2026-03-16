import { GoogleSsoDirective } from './google-sso.directive';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('GoogleSsoDirective', () => {
  let afAuthSpy: any;

  beforeEach(() => {
    afAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['signInWithPopup']);
  });

  it('should create an instance', () => {
    const directive = new GoogleSsoDirective(afAuthSpy);
    expect(directive).toBeTruthy();
  });
});
