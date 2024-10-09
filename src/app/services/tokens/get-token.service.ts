import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { User } from '@app/model/user.model';
import { HttpClientService } from '@services/interceptor/http-client-service.service';
import { Login } from '@app/model/login.model';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  constructor(private http:HttpClientService) {}

  public getToken(user : string, uid : string): Promise<any> {
    const authTokenStorage = localStorage.getItem('authToken');
    if(authTokenStorage != null && authTokenStorage != undefined){
      const decode = atob(authTokenStorage);
      var userObj = JSON.parse(decode);
      
      if(userObj.user != null &&  user == '' ){
        user = userObj.user.email;
      }
      
      if(userObj.user != null &&  uid == '' ){
        uid = userObj.user.uid;
      }
    }
    const body : Login = {
     email: user,
     uid: uid 
    };

   return this.http.fetchBasic(`${environment.backend.token}`,{
    method: 'POST',
    body: JSON.stringify(body)
   })
      .then((response:Response) => response.json())
      .then((data:any) => {
        userObj = {"email": user, "uid": uid, "token": data.token} as User;
        localStorage.setItem('authToken', btoa(JSON.stringify(userObj)));
        return data.token;
      }).catch(error => {throw error});
  }
}
