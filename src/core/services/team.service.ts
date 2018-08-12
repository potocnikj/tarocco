/**
 * Internal
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
/**
 * Services
 */
import { AuthenticationService } from './authentication.service';
/**
 * Models
 */
import { NewTeam } from '../models/new-team';
/**
 * Environment
 */
import { environment } from '../../environments/environment';
import { Team } from '../models/team';

@Injectable()
export class TeamService {
  private gameUri = environment.baseUri.concat('Team/');

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
  }

  public create(newTeam: NewTeam): Observable<Team> {
    return this.http
      .post(this.gameUri, newTeam, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => rsp)
      .map(rsp => new Team(rsp));
  }

  public get(gameId: string): Observable<Team> {
    return this.http
      .get(this.gameUri + gameId, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => rsp)
      .map(rsp => new Team(rsp));
  }

  public retreiveTeam(): Team {
    return new Team(JSON.parse(localStorage.getItem('access-token')).team);
  }
}
