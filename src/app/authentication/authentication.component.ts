import { Component } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  email = "";
  isLogged = false;
  
  constructor() {
    this.email= "<<add your email.>>";
  }

  logOut():void {
    console.log("loging out...");
    this.email = "loging out...";
    this.isLogged = false;
    //public angularFireAuth: AngularFireAuth
    //this.angularFireAuth.signOut(); 
    
  }

  logIn():void{
    console.log("loging in...");
    this.email = "loging in...";
    this.isLogged = true;
  }

}
