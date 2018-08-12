import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { isUndefined } from 'util';

import { environment } from '../../environments/environment';
import { Authentication } from '../models/authentication';
import { AccessToken } from '../models/access-token';

@Injectable()
export class AuthenticationService {
  private loginUri = environment.baseUri.concat('team/login');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  public authenticate(authentication: Authentication): Observable<AccessToken> {
    return this.http
      .post(this.loginUri, authentication)
      .map(rsp => rsp)
      .map(rsp => new AccessToken(rsp));
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public storeAccessToken(accessToken: AccessToken): void {
    localStorage.setItem('access-token', JSON.stringify(accessToken));
  }

  public isAuthenticated(): boolean {
    return !isUndefined(this.retreiveAccessToken().accessToken);
  }


  public getAuthorizationHeader(): HttpHeaders {
    if (!this.isAuthenticated()) {
      return;
    }
    return new HttpHeaders().set('access-token', this.retreiveAccessToken().accessToken);
  }

  private retreiveAccessToken(): AccessToken {
    return new AccessToken(JSON.parse(localStorage.getItem('access-token')));
  }
}
