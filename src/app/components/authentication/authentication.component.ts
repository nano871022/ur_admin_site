import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { environment } from '@src/environments/environment';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { GetTokenService } from '@services/tokens/get-token.service';

@Component({
  standalone: true,
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  imports:[MatButtonModule,MatIconModule]
})
export class AuthenticationComponent {
  email : String | null = null;
  isLogged = false;
  private credential : any;
  
  constructor(private auth: AngularFireAuth,private router: Router, private getTokeSvc:GetTokenService) {
    this.validateLogged();
  }

  logOut():void {
    this.auth.signOut().then(()=>{;
      this.email = null;
      this.isLogged = false;
      this.getTokeSvc.unAuthenticate();
      this.router.navigateByUrl(this.router.url);
    });
  }

  async validateLogged(){
    this.auth.onAuthStateChanged((user)=>{
      if(user !== null){
        this.getTokeSvc.getToken(user?.email?? '' ,user?.uid ?? '').then((token)=>{
          this.isLogged = true;
          this.email = user.email;
          this.router.navigate(['/main']);  
        }).catch((error)=>{
          this.logOut();
        })
      }
    });
  }

  async logIn(){
    var credential = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if(credential !== null && credential.user !== null){
      var user = credential.user
      this.getTokeSvc.getToken(user?.email?? '' ,user?.uid ?? '').then((token)=>{
          this.isLogged = true;
          this.email = user.email;
          this.credential = credential;
          this.router.navigate(['/main']);  
        }).catch((error)=>{
          this.logOut();
        })
    }
  }
}
