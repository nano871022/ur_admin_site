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
    
    console.log("url: ",environment.firebaseConfig.data.url);
    console.log("headers: ",headers);
    return this.http.get<any>(environment.firebaseConfig.data.url+'/'+tokenName, { headers: headers }); 
  }

  requestPermission(): any{
    console.log("== requestPermission");
   this.tokenSvc.getToken().subscribe({next: token => {
     this.token = (token as any).token;
   },
   error: err => { console.log("===ERROR: "+err); return err ; }
   })
  } 
}
