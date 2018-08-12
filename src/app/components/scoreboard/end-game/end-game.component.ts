/**
 * Internal
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
/**
 * Services
 */
import { ModalService } from '../../../../core/services/render/modal.service';
import { GameService } from '../../../../core/services/game.service';
import { HttpService } from '../../../../core/services/http.service';
import { ScoreBoardService } from '../../../../core/services/score-board.service';
import { ToastService } from '../../../../core/services/render/toast.service';
/**
 * Models
 */
import { Game } from '../../../../core/models/game';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  @Output() mask = new EventEmitter();
  @Output() unmask = new EventEmitter();
  @Output() gameChanged = new EventEmitter();

  constructor(public modalService: ModalService,
              private gameService: GameService,
              private httpService: HttpService,
              private scoreBoardService: ScoreBoardService,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  public endGame() {
    this.mask.next();
    this.modalService.close('endGame');
    this.scoreBoardService
      .endGame(this.gameService.currentGame.gameId)
      .subscribe(
        game => this.loadFinishedGame(game),
        error => this.httpService.handleError(error)
      );
  }

  private loadFinishedGame(game: Game): void {
    this.unmask.next();
    this.toastService.addToast('Obvestilo', 'Igra je bila uspešno zaključena!', 'success');
    this.gameChanged.next();
  }
}
