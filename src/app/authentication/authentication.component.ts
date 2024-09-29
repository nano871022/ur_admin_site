import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

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
  
  constructor(private auth: AngularFireAuth,private router: Router) {
    this.validateLogged();
  }

  logOut():void {
    this.auth.signOut().then(()=>{;
      this.email = null;
      this.isLogged = false;
      this.router.navigate(['/']);
    });
  }

  async validateLogged(){
    this.auth.onAuthStateChanged((user)=>{
      if(user !== null){
        this.isLogged = true;
        this.email = user.email;
        this.router.navigate(['/main']);
      }
    });
  }

  async logIn(){
    var credential = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.isLogged = true;
    this.credential = credential;
    if(credential !== null && credential.user !== null){
      this.email = credential.user.email;
    }
    this.router.navigate(['/main']);
  }

}
