import { Injectable } from '@angular/core';
import { Notification, Notifications } from '@app/model/notification.model';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { getMessaging } from "firebase/messaging";
import { GetTokenService } from "@services/tokens/get-token.service";
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { HttpClientService } from '@services/interceptor/http-client-service.service';


@Injectable({
  providedIn: 'root'
})
export class CloudMessageSenderService {

    constructor(private http:HttpClientService) { }

  send(notification: Notification) {
    var request : Notifications = {
                                    notifications: notification, 
                                    to : "allUsers"
                                  };
    
    return this.http.fetchAuth(`${environment.backend.messager}`, {
      method: 'POST',
      body: JSON.stringify(request)
    }).then(response => response.json())
    .then(data => {
        return data;
    });
  }

}
