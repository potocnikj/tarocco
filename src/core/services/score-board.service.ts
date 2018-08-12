import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Round, RoundList } from '../models/round';
import { NewRound } from '../models/new-round';
import { Player } from '../models/player';
import { AuthenticationService } from './authentication.service';
import { Game } from '../models/game';
import { GameService } from './game.service';
import { BaseService } from './base.service';

@Injectable()
export class ScoreBoardService {

  public roundList: Array<Round>;
  public lastRound: Round;

  private scoreBoardUri = environment.baseUri.concat('ScoreBoard/');

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private gameService: GameService
  ) {
  }

  public getScoreBoard(gameId: string): Observable<RoundList> {
    const uri = this.scoreBoardUri.concat(gameId);
    return this.http
      .get(uri, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => rsp)
      .map(rsp => new RoundList(rsp));
  }

  public deleteLastround(gameId: string): Observable<RoundList> {
    const uri = this.scoreBoardUri.concat(gameId);
    return this.http
      .delete(uri, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => new RoundList(rsp));
  }

  public postRound(round: NewRound): Observable<Round> {
    return this.http
      .post(this.scoreBoardUri, round, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => rsp)
      .map(rsp => new Round(rsp));
  }

  public endGame(gameId: string): Observable<Game> {
    return this.http
      .post(this.scoreBoardUri + 'end/' + gameId, {}, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => rsp)
      .map(rsp => new Game(rsp));
  }

  public addRound(round: Round): void {
    this.roundList.push(round);
  }

  public removeLastRound(round: Round): void {
    const removedRound = this.roundList.pop();
    if (removedRound.roundId !== round.roundId) {
      console.error('Last round was not same on the client as on the server!');
    }
  }

  public getOrderedPlayers(): Array<Player> {
    if (!this.gameService.currentGame.players) {
      return;
    }
    const result = [];
    if (this.lastRound) {
      this.lastRound.roundResults.forEach((r) => {
        this.gameService.currentGame.players.forEach((p) => {
          if (r.playerId === p.playerId) {
            result.push(p);
          }
        });
      });
    }
    if (result.length > 0) {
      this.gameService.currentGame.players = result;
    }

    return this.gameService.currentGame.players;
  }

}
