import { Injectable } from '@angular/core';
import { Notification, Notifications } from '../../model/notification.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudMessageSenderService {

  constructor(private http:HttpClient) { }

  send(notification: Notification):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=' + environment.firebaseConfig.apiKey
    });
    const token = environment.firebaseConfig.messager.messagerToken;
    var request : Notifications = {
                                    notifications: notification, 
                                    to : token
                                  };
    return this.http.post<any>(environment.firebaseConfig.messager.messageUrl, request, { headers: headers });
  }
}
