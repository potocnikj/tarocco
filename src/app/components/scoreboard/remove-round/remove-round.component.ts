import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from '../../../../core/services/render/modal.service';
import { HttpService } from '../../../../core/services/http.service';
import { ScoreBoardService } from '../../../../core/services/score-board.service';
import { GameService } from '../../../../core/services/game.service';

@Component({
  selector: 'app-remove-round',
  templateUrl: './remove-round.component.html',
  styleUrls: ['./remove-round.component.css']
})
export class RemoveRoundComponent implements OnInit {

  @Output() gameChanged = new EventEmitter();

  constructor(
    public modalService: ModalService,
    public httpService: HttpService,
    public scoreBoardService: ScoreBoardService,
    public gameService: GameService,
  ) { }

  ngOnInit() {
  }

  public deleteLastRound(gameId = this.gameService.currentGame.gameId): void {
    this.scoreBoardService
      .deleteLastround(gameId)
      .subscribe(
        rsp => this.loadResponse(rsp),
        error => this.httpService.handleError(error)
      );
  }

  private loadResponse(rsp: any): void {
    this.gameChanged.next();
    this.modalService.close('removeRound');
  }
 }
