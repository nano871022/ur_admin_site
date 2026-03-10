import { GoogleSsoDirective } from './google-sso.directive';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('GoogleSsoDirective', () => {
  it('should create an instance', () => {
    const mockAngularFireAuth = {} as AngularFireAuth;
    const directive = new GoogleSsoDirective(mockAngularFireAuth);
    expect(directive).toBeTruthy();
  });
});
