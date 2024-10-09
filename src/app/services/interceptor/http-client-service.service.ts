import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class HttpClientService {

  private cache = new Map<string, {response:Response, timestamp:number}>();
  private CACHE_EXPIRATION_TIME = environment.timerCacheMins * 60 * 1000; // 10 minutes

  constructor(private auth: AngularFireAuth) { }

  public async fetchAuth(input: RequestInfo, init?: RequestInit,refresh:boolean = false): Promise<Response> {

    var authToken = JSON.parse(atob(localStorage.getItem('authToken')!));

    if( typeof input === 'string'  && input.startsWith('/api/') ) {
      input = `${environment.backend.host}:${environment.backend.port}${input}`;
    }
      
    const modifiedInit: RequestInit = {
      method: init?.method ?? 'GET',
      headers: {
        'Authorization': `Bearer ${authToken.token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Application':'ur-admin-site'
      },
      body: init?.body
    };

    const cacheKey = `${input}${JSON.stringify(modifiedInit)}`;
    const now = Date.now();
    const cacheEntry = this.cache.get(cacheKey);

    if(cacheEntry && now - cacheEntry.timestamp < this.CACHE_EXPIRATION_TIME && !refresh) {
      return Promise.resolve(cacheEntry.response.clone());
    }

   return fetch(input, modifiedInit).then(async (response: Response) => {; 
      if(response.status === 401) {
         return this.auth.signOut().then(()=>{;
                  window.location.href = '/';  
                  return Promise.reject("Unauthorized: Redirecting to login");
              });
      }

     if( response.ok ) {
       var responseClone = response.clone();
       this.cache.set(cacheKey, {response: responseClone, timestamp: now});
       return response;
     }

     return response;
   });
  }

  public async fetchBasic(input: RequestInfo, init?: RequestInit): Promise<Response> {
     if( typeof input === 'string'  && input.startsWith('/api/') ) {
      input = `${environment.backend.host}:${environment.backend.port}${input}`;
    }
     const modifiedInit: RequestInit = {
      method: init?.method ?? 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Application':'ur-admin-site'
      },
      body: init?.body
    };
    return fetch(input, modifiedInit)
    .then(async (response: Response) => {
      if(response.status === 401) {
         return this.auth.signOut().then(()=>{;
                  window.location.href = '/';  
                  return Promise.reject("Unauthorized: Redirecting to login");
              });
         return response;
      }
      return response;
    });
  }
}
