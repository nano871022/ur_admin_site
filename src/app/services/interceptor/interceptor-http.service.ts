import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorHttpService implements HttpInterceptor{

  constructor() { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request: "+request);
    console.log("Next: "+next);
    return next.handle(request).pipe(
      catchError(error => {
        console.log("Error: "+error);
        throw Error( error);
      }));
  }
}
