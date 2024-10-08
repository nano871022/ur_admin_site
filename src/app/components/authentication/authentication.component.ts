import { Component, NgZone, OnInit } from '@angular/core';
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
export class AuthenticationComponent implements OnInit{
  email : String | null = null;
  remainder : string | null = null;
  isLogged = false;
  private credential : any;
  private date : Date | null = null;
  private intervalId:any
  
  constructor(private auth: AngularFireAuth,private router: Router, private getTokeSvc:GetTokenService,private ngZone: NgZone) {
    this.validateLogged();
  }

  logOut():void {
    this.auth.signOut().then(()=>{;
      this.email = null;
      this.isLogged = false;
      this.router.navigateByUrl(this.router.url);
    });
  }

  renew():void{
    this.getToken(this.credential.user.email ?? '',this.credential.user?.uid ?? '').then((token)=>{ 
       this.isLogged = true;
    }).catch((error)=>{
          this.logOut();
        });
  }

  async validateLogged(){
    this.auth.onAuthStateChanged((user)=>{
      if(user !== null){
        this.getToken(user.email ?? '',user.uid ?? '').then((token)=>{
          this.credential = user;
        });
      }
    });
  }

  async logIn(){
    var credential = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if(credential !== null && credential.user !== null){
      var user = credential.user
      this.getToken(user?.email?? '' ,user?.uid ?? '').then((token)=>{;
        this.credential = credential;
      });
    }
  }

  getToken(email: string, uid: string){
      return this.getTokeSvc.getToken(email ,uid).then((token)=>{
          this.isLogged = true;
          this.email = email;
          this.router.navigate(['/main']);  
          this.date = new Date();
        }).catch((error)=>{
          this.logOut();
        })
    }

    ngOnInit(){
        this.intervalId = setInterval(()=>{
          if(this.date !== null && this.isLogged){
            this.remainder = ((new Date().getTime() - this.date.getTime())/1000).toString();
            console.log("Remainder: " + this.remainder);
          }   
        },1000);
    }

    ngOnDestroy(){
      clearInterval(this.intervalId);  
    }

}
