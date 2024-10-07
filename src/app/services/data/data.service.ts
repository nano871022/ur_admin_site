import { Injectable } from '@angular/core';
import { Notification, Notifications } from '@app/model/notification.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { getMessaging } from "firebase/messaging";
import { GetTokenService } from "@services/tokens/get-token.service";
import { AngularFireMessaging } from '@angular/fire/compat/messaging';


@Injectable({
  providedIn: 'root'
})
export class DataService {

   token:string | null = null;
   
  constructor(private http:HttpClient, private tokenSvc:GetTokenService) { 
    this.requestPermission();
  }


  getData(tokenName: string):Observable<any>{
     const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Application':'ur-admin-site'
    });
    
    return this.http.get<any>(environment.backend.host+":"+environment.backend.port+environment.backend.data+'/'+tokenName, { headers: headers }); 
  }

  unAuthenticate(){
    this.tokenSvc.unAuthenticate();
  }

  requestPermission(): any{
      this.tokenSvc.getToken('','').then(token => {
         this.token = token;
      }).catch(err => this.tokenSvc.unAuthenticate());
  } 
}
