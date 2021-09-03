import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// services
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userSvc: UserService
  ) {}

  canActivate(): boolean {
    if( !this.userSvc.loggedIn() ) {
      this.router.navigate(['/login']);
      return false;

    } else {
      return true;
    }
  }
  
}
