/**
 * Internal
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
/**
 * Services
 */
import { GameService } from '../../../../core/services/game.service';
import { DropDownService } from '../../../../core/services/render/dropdown.service';
/**
 * Models
 */
import { Game } from '../../../../core/models/game';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() gameChanged = new EventEmitter();
  @Input() active: boolean;

  constructor(public gameService: GameService,
              public dropDownService: DropDownService) {
  }

  ngOnInit() {
  }

  public selectGame(game: Game) {
    this.gameService.setCurrentGame(game);
    this.dropDownService.gameMenu = false;
    this.gameChanged.next();
  }
}
