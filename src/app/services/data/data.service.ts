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

   values : Map<string, string> = new Map<string, string>();
   
  constructor(private http:HttpClientService) { }


  getData(tokenName: string):Promise<any>{
    if(this.values.get(tokenName) != null && this.values.get(tokenName) != undefined){
      return Promise.resolve(this.values.get(tokenName));
    }

    return this.http.fetchAuth(environment.backend.host+":"+environment.backend.port+environment.backend.data+'/'+tokenName)
    .then(response => response.json())
    .then(data => {
       this.values.set(tokenName, data);   
       return data;
    });
  }
}
