import { Directive } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@firebase/auth';

@Directive({
  selector: '[appGoogleSso]',
  standalone: true
})
export class GoogleSsoDirective {

  constructor(private angularFireAuth:AngularFireAuth) {}
  @HostListener('click')
  async onClick() {
    console.log("=== Sign in with Google ===");
    const credential = await this.angularFireAuth.signInWithPopup(
      new GoogleAuthProvider()
    ); 
    console.log(credential);
  }

}
