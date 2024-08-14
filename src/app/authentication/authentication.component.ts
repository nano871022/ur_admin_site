import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  email = "";
  isLogged = false;
  private credential : any;
  
  constructor(private auth: AngularFireAuth) {}

  logOut():void {
    console.log("loging out...");
    this.email = "loging out...";
    this.isLogged = false;
    //public angularFireAuth: AngularFireAuth
    //this.angularFireAuth.signOut(); 
    
  }

  async logIn(){
    var credential = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log("loging in...");
    this.email = "loging in..."+credential.additionalUserInfo?.profile;
    this.isLogged = true;
    this.credential = credential;
  }

}
