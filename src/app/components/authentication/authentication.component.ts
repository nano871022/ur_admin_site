import { Component, NgZone, OnInit, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { environment } from '@src/environments/environment';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { GetTokenService } from '@services/tokens/get-token.service';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  imports:[MatButtonModule,MatIconModule,CommonModule]
})
export class AuthenticationComponent implements OnInit{
  email : String | null = null;
  remainder : string | null = null;
  isLogged = false;
  isEnableToGetRenewToken = true;
  clockState : string = 'normal';
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
    this.getToken(this.credential?.user?.email ?? '',this.credential?.user?.uid ?? '').then((token)=>{ 
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
          this.task();
        }).catch((error)=>{
          this.logOut();
        })
    }

    ngOnInit(){
      this.task();
     
    }

    createDelay(delay: number) {
      return timer(delay);
    }

    task(){
      this.createDelay(1000)
      .subscribe(() => {
        if(this.isLogged){
          const nano = ((new Date().getTime() - (this.date?.getTime()?? 0))/1000);
          const minutes = Math.floor(nano / 60);
          const seconds = Math.floor(nano % 60);

          if( minutes < environment.timerLoginMins - 4){
            this.isEnableToGetRenewToken = true;
            this.clockState = 'normal';
          } else if( minutes < environment.timerLoginMins - 2){
            this.isEnableToGetRenewToken = false;
            this.clockState = 'close';
          } else if( minutes < environment.timerLoginMins){
            this.isEnableToGetRenewToken = false;
            this.clockState = 'end';
          }else{
            this.isEnableToGetRenewToken = true;
            this.logOut();
          }
          this.remainder = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
          this.task();
          }
      });
    }

}
