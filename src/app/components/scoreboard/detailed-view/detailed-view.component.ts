import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../core/services/render/modal.service';
import {GameService} from '../../../../core/services/game.service';
import {Player} from '../../../../core/models/player';
import {isUndefined} from "util";

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {

  @Input() detailedRound: any;
  games = ['III', 'II', 'I', 'Solo III', 'Solo II', 'Solo I', 'Berač', 'Odprti Berač'];
  constructor(
    public modalService: ModalService,
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  getGameType(type: number): string {
    return this.games[(type / 10 - 1)];
  }

  getResult(type: boolean): string {
    return type ? 'Zmaga' : 'Poraz';
  }

  getAnounced(type: boolean): string {
    return type ? 'Napovedan' : 'Nenapovedan';
  }

  getPlayerById(id: string): string {
    const player = this.gameService.currentGame.players.find(p => p.playerId === id);
    return !isUndefined(player) ? player.name : '';
  }
}
