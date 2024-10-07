import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { User } from '@app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  private user: User | null = null;

  constructor(private http:HttpClient) {}

  public getToken(user : string, uid : string){
    if(this.user != null &&  user == '' ){
      user = this.user.email;
    }
    if(this.user != null &&  uid == '' ){
      uid = this.user.uid;
    }

    const headersInit = new Headers({
      'Application': 'ur-admin-site',
      'host':environment.backend.host+':'+environment.backend.port,
    });

    if(this.user != null && this.user?.token.length > 0){
      return Promise.resolve(this.user?.token);
    }

     return fetch(environment.backend.host+":"+environment.backend.port+environment.backend.token+"?user="+user+"&uid="+uid,{
        method: 'GET',
        headers: headersInit
      }).then(response => response.json())
      .then(data => {
        this.user = {"email": user, "uid": uid, "token": data.token} as User;
        return data.token;
      }).catch(error => {throw error;});
  }
  public unAuthenticate(){
    this.user = {"email": this.user?.email ?? '', "uid": this.user?.uid ?? '', "token": ''} as User;
  }



}
