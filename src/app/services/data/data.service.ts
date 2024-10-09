import { Injectable } from '@angular/core';
import { Notification, Notifications } from '@app/model/notification.model';
import { environment } from '@src/environments/environment';
import { getMessaging } from "firebase/messaging";
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { HttpClientService } from '@services/interceptor/http-client-service.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClientService) { }


  getData(tokenName: string, refresh:boolean = false):Promise<any>{
    return this.http.fetchAuth(`${environment.backend.data}/${tokenName}`,{},refresh)
    .then(response => response.json());
  }
}
