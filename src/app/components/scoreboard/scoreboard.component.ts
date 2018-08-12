/**
 * Internal
 */
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/**
 * Services
 */
import { ModalService } from '../../../core/services/render/modal.service';
import { HttpService } from '../../../core/services/http.service';
import { GameService } from '../../../core/services/game.service';
import { ScoreBoardService } from '../../../core/services/score-board.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { TeamService } from '../../../core/services/team.service';
import { ScoreboardHub } from './scoreboardhub.components';
import { ToastService } from '../../../core/services/render/toast.service';
import { DropDownService } from '../../../core/services/render/dropdown.service';
/**
 * Models
 */
import { Team } from '../../../core/models/team';
import { Round } from '../../../core/models/round';
import { Game } from '../../../core/models/game';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  private hub: ScoreboardHub;
  /**
   * Property for masking page
   */
  public loading: boolean;
  public team: Team;
  public detailedRound: Round;
  /**
   * Property for handling dropdown closing.
   */
  public preventToggling = true;

  constructor(public modalService: ModalService,
              public authenticationService: AuthenticationService,
              public dropDownService: DropDownService,
              public gameService: GameService,
              private toastService: ToastService,
              public scoreBoardService: ScoreBoardService,
              public teamService: TeamService,
              private httpService: HttpService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
        // TODO fix this properly at one point.
        if (params.gameId !== undefined || params === null) {
          const game = new Game(params);
          this.gameService.setCurrentGame(game);
        } else {
          const game = this.gameService.getCurrentGame();
          this.gameService.setCurrentGame(game);
        }
    });
  }

  @HostListener('document:click', ['$event'])
  handleClickEvent() {
    if (this.preventToggling) {
      this.preventToggling = false;
      return;
    }
    this.dropDownService.gameMenu = false;
  }

  ngOnInit() {
    this.getGames();
    this.gameService.getCurrentGame();
  }

  public getNumberOfPlayers(): number {

    if (!this.gameService.currentGame.players) {
      return 4;
    }

    return this.gameService.currentGame.players.length;
  }

  public setDetailedRound(round: Round): void {
    this.detailedRound = round;
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

  public getScoreBoard(gameId = this.gameService.currentGame.gameId): void {
    this.loading = true;
    this.scoreBoardService
      .getScoreBoard(gameId)
      .subscribe(
        entities => this.loadScoreBoard(entities),
        error => this.httpService.handleError(error)
      );
  }

  public toggleGameMenu() {
    this.dropDownService.toggle('games');
    this.preventToggling = this.dropDownService.gameMenu;
  }


  private loadGames(entities: any): void {
    this.gameService.games = entities.data;
    this.gameService.getCurrentGame();
    this.getScoreBoard();
  }

  private loadGame(entity: any): void {
    this.gameService.setCurrentGame(entity.data);

    // after loading a game scoreboard also connect to hub for updates
    if (this.hub && this.gameService.currentGame.gameId !== this.hub.gameId) {
      this.hub.changeGame(this.gameService.currentGame.gameId);
    } else if (!this.hub) {
      this.hub = new ScoreboardHub(this.gameService.currentGame.gameId);

      this.hub.onAddRound((round) => {
        this.scoreBoardService.addRound(Round.init(round));
        this.updateScoreBoard();

        this.toastService.addToast('Obvestilo', 'Nova runda uspešno dodana!', 'success');
        setTimeout(() => { // Ideally we could know when ngFor finished rendering and then scroll. But we don't. So this.
         this.scrollToBottom();
        }, 100);
      });

      this.hub.onDeleteRound((round) => {
        this.scoreBoardService.removeLastRound(Round.init(round));

        this.toastService.addToast(
          'Obvestilo',
          'Zadnja runda je bila odstranjena.',
          'success'
        );
        this.updateScoreBoard();
        setTimeout(() => { // Ideally we could know when ngFor finished rendering and then scroll. But we don't. So this.
        this.scrollToBottom();
       }, 100);
      });

      this.hub.startHub();
    }
  }

  private scrollToBottom(): void {
    const table = document.getElementById('scoreBoard');
    table.scrollTo(0, table.scrollHeight);
    document.body.scrollTo(0, document.body.scrollHeight);
  }

  public mask(): void {
    this.loading = true;
  }

  public unmask(): void {
    this.loading = false;
  }

  public newGame() {
    this.team = this.teamService.retreiveTeam();
    this.modalService.open('newGame');
  }

  private updateScoreBoard() {
    if (this.scoreBoardService.roundList.length === 0) {
      return;
    }
    const lastRound = this.scoreBoardService.roundList[this.scoreBoardService.roundList.length - 1];
    this.scoreBoardService.lastRound = lastRound;
    lastRound.roundResults.forEach((r) => {
      r.radelci = [];
      for (let k = 1; k <= r.playerRadelcCount; k++) {
        if (k <= r.playerRadelcUsed) {
          r.radelci.push(true);
        } else {
          r.radelci.push(false);
        }
      }
    });
  }
  private loadScoreBoard(entities: any): void {
    /**
     * Last round needs to be undefined before rendering starts
     */
    this.scoreBoardService.lastRound = null;
    this.scoreBoardService.roundList = entities.data;
    this.updateScoreBoard();
    this.getGame(this.gameService.currentGame.gameId);
    this.loading = false;
  }
}
