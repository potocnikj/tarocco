/**
 * Internal
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
/**
 * Services
 */
import { ModalService } from '../../../../core/services/render/modal.service';
import { GameService } from '../../../../core/services/game.service';
import { HttpService } from '../../../../core/services/http.service';
import { ToastService } from '../../../../core/services/render/toast.service';
/**
 * Models
 */
import { Team } from '../../../../core/models/team';
import { NewGame } from '../../../../core/models/new-game';
import { Player } from '../../../../core/models/player';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  public newGame: NewGame;

  @Input() team: Team;
  @Output() mask = new EventEmitter();
  @Output() unmask = new EventEmitter();
  @Output() gameChanged = new EventEmitter();

  constructor(public modalService: ModalService,
              public gameService: GameService,
              private httpService: HttpService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.newGame = NewGame.init({});
  }

  toggleActive(member: Player): void {
    member.active = !member.active;
  }

  populateMembers(): void {
    this.newGame.players = [];
    this.team.members.forEach((m) => {
      if (m.active) {
        this.newGame.players.push(m);
      }
    });
  }

  public makeNewGame(): void {
    this.mask.next();
    this.modalService.close('newGame');
    this.populateMembers();
    this.gameService
      .postGame(this.newGame)
      .subscribe(
        entity => this.loadGame(entity),
        error => this.httpService.handleError(error)
      );
  }

  private loadGame(entity: any): void {
    /**
     * Whenever a new game is created it becomes active, and it's appended to the other games.
     */
    this.gameService.setCurrentGame(entity.data);
    this.gameService.games.unshift(this.gameService.currentGame); // TODO service layer
    this.gameChanged.next();
    this.unmask.next();
    this.toastService.addToast('Obvestilo', 'Nova igra uspešno dodana!', 'success');
  }
}
