import { Injectable } from '@angular/core';
import { Notification, Notifications } from '../../model/notification.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { getMessaging } from "firebase/messaging";
import { GetTokenService } from "../tokens/get-token.service";
import { AngularFireMessaging } from '@angular/fire/compat/messaging';


@Injectable({
  providedIn: 'root'
})
export class CloudMessageSenderService {

  token:string | null = null;
  constructor(private http:HttpClient, private tokenSvc:GetTokenService) { 
    this.requestPermission();
  }

  send(notification: Notification):Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Application':'ur-admin-site'
    });
    var request : Notifications = {
                                    notifications: notification, 
                                    to : "allUsers"
                                  };
    console.log("url: ",environment.firebaseConfig.messager.messageUrl);
    console.log("headers: ",headers);
    return this.http.post<any>(environment.firebaseConfig.messager.messageUrl, request, { headers: headers });
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
