import { Component, OnInit } from '@angular/core';
import { Authentication } from '../../../core/models/authentication';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { HttpService } from '../../../core/services/http.service';
import { AccessToken } from '../../../core/models/access-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public authentication: Authentication;
  public accessToken: AccessToken;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private httpService: HttpService) {
  }

  ngOnInit() {
    this.authentication = Authentication.init({teamId: '', passphrase: ''});
  }

  public authenticate(): void {
    this.authenticationService
      .authenticate(this.authentication)
      .subscribe(
        entities => this.loadAccessToken(entities),
        error => this.httpService.handleError(error)
      );
  }

  private loadAccessToken(rsp: any) {
    /**
     * Load accessToken, and store it.
     */
    this.accessToken = new AccessToken(rsp.data);
    this.authenticationService.storeAccessToken(this.accessToken);
    this.router.navigate(['/']);
  }
}
