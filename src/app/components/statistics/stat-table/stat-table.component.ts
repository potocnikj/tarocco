import { Component, Input, OnInit } from '@angular/core';
import { GameStatistics } from '../../../../core/models/game-statistics';

@Component({
  selector: 'app-stat-table',
  templateUrl: './stat-table.component.html',
  styleUrls: ['./stat-table.component.css']
})
export class StatTableComponent implements OnInit {

  @Input() statistics: Array<GameStatistics>;

  constructor() { }

  ngOnInit() {
  }

}
