import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { isUndefined } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    const result = this.authenticationService.isAuthenticated();
    if (!result) {
      this.router.navigate(['/login']);
    }

    return result;
  }
}
