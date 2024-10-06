import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  constructor(private http:HttpClient) { 
  }

  public getToken() {
     const headers = new HttpHeaders({
      'Application': 'ur-admin-site',
      'host':'http:://localhost:8070',
    });
    return this.http.get<any>("http://localhost:8090/api/login/create?user=user@japl.dev&uid=aaaaaa", { headers: headers });
  }
}
