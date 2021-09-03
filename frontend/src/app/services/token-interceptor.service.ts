import { Injectable }      from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// servicios
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private userSvc: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ this.userSvc.getToken() }`,
      }
    });
    
    return next.handle(tokenReq);
  }

}
