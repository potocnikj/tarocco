import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import { GameStatistics } from '../../../core/models/game-statistics';
import { HttpService } from '../../../core/services/http.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public teamMode = true;
  public teamDisplay = 'Ekipno';
  public statistics: Array<GameStatistics>;
  public loading: boolean;

  constructor(
    public gameService: GameService,
    private httpService: HttpService) {
  }

  public setTeamMode(teamMode: boolean): void {
    if (this.teamMode === teamMode)
      return;

    this.teamMode = teamMode;
    this.teamDisplay = teamMode ? 'Ekipno' : 'Igra';
    this.getStatistics();
  }

  ngOnInit() {
    this.getGames();
  }

  public getGames(): void {
    this.gameService
      .getGames()
      .subscribe(
        entities => this.loadGames(entities),
        error => this.httpService.handleError(error)
      );
  }

  public getGame(gameId: string): void {
    this.gameService
      .getGame(gameId)
      .subscribe(
        entity => this.loadGame(entity),
        error => this.httpService.handleError(error)
      );
  }

  public getStatistics(game = this.gameService.currentGame): void {
    this.loading = true;
    this.gameService
      .getStatistics(game.teamId, this.teamMode ? null : game.gameId)
      .subscribe(
        entities => this.loadStatistics(entities),
        error => this.httpService.handleError(error)
      );
  }

  private loadStatistics(rsp) {
    this.loading = false;
    this.statistics = rsp.data;
  }

  private loadGames(entities: any): void {
    this.gameService.games = entities.data;
    this.gameService.getCurrentGame();
    this.getStatistics();
  }

  private loadGame(entity: any): void {
    this.gameService.setCurrentGame(entity.data);
    this.getStatistics();
  }
}
