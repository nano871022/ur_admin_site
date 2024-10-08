import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable()
export class InterceptorAuthService implements HttpInterceptor{


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
            headers: request.headers.set('Authorization', 'Bearer tu_token')
        });
    console.log("Auth"+modifiedRequest);
    return next.handle(modifiedRequest);
  }


}
