import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropDownService } from '../../../../core/services/render/dropdown.service';
import { GameService } from '../../../../core/services/game.service';
import { Game } from '../../../../core/models/game';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {

  @Output() gameChanged = new EventEmitter();

  constructor(
    public dropDownService: DropDownService,
    public gameService: GameService
  ) { }

  ngOnInit() {
  }

  public selectGame(game: Game) {
    this.gameService.setCurrentGame(game);
    this.dropDownService.toggle('gameMenu');
    this.gameChanged.next();
  }

}
