import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Game } from '../models/game';
import { NewGame } from '../models/new-game';
import { Player } from '../models/player';
import { GameStatisticsList } from '../models/game-statistics';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { BaseService } from './base.service';

@Injectable()
export class GameService {

  public games: Array<Game>;

  private _currentGame: Game;
  public get currentGame(): Game
  {
    return this._currentGame;
  }

  private gameUri = environment.baseUri.concat('game/');
  private statisticsUri = environment.baseUri.concat('statistics');

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  public getGames(): Observable<Game> {
    return this.http
      .get(this.gameUri)
      .map(rsp => new Game(rsp));
  }

  public postGame(newGame: NewGame): Observable<Game> {
    return this.http
      .post(this.gameUri, newGame, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => new Game(rsp));
  }

  public getGame(gameId: string): Observable<Game> {
    return this.http
      .get(this.gameUri + gameId, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => new Game(rsp));
  }

  public getStatistics(teamId: string, gameId?: string): Observable<GameStatisticsList> {
    console.log('teamId', teamId);
    console.log('gameId', gameId);
    let q = new HttpParams();
    q = q.set('teamId', teamId);
    if (gameId)
      q = q.set('gameId', gameId);

    return this.http
      .get(this.statisticsUri,
         {
           headers: this.authenticationService.getAuthorizationHeader(),
           params: q
         })
      .map(rsp => new GameStatisticsList(rsp));
  }

  public setCurrentGame(game: Game): void {
    console.log(`Setting current game to gameId: ${game.gameId}`);
    this._currentGame = game;
    this.router.navigate(['/scoreboard', { gameId: game.gameId }]);
  }

  public getCurrentGame(): Game {
    if (this._currentGame == null)
      this._currentGame = this.games[0]; // some other logic?

    return this._currentGame;
  }
}
