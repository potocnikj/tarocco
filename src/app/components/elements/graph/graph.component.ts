/**
 * Internal
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
/**
 * Models
 */
import { GameStatistics } from '../../../../core/models/game-statistics';
import { Result } from '../../../../core/models/result';
/**
 * Services
 */
import { BaseService } from '../../../../core/services/base.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges {

  @Input() statistics: Array<GameStatistics>;
  @Input() type = 'line';
  @Input() graph = 'AVGP';

  width: number;
  height: number;

  isMobileDisplay: boolean;

  result: Array<Result>;

  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit() {
    if (this.baseService.isMobileDisplay()) {
      this.width = 360;
      this.height = 300;
    } else {
      this.width = 650;
      this.height = 600;
    }
  }

  ngOnChanges() {
    this.initData();
  }

  private initData(): void {
    switch (this.graph) {
      case 'passive': {
        this.initCountPrikolica();
        break;
      }
      case 'active': {
        this.initCountLead();
        break;
      }
      default: {
        this.initAveragePerRound();
        break;
      }
    }
  }

  private initAveragePerRound(): void {
    if (!this.statistics) {
      return;
    }
    this.result = [];
    this.statistics.forEach((s) => {
      this.result.push(new Result({name: s.name, value: s.averagePerRound}));
    });
  }

  private initCountPrikolica(): void {
    if (!this.statistics) {
      return;
    }
    this.result = [];
    this.statistics.forEach((s) => {
      this.result.push(new Result({name: s.name, value: s.countPrikolica}));
    });
  }

  private initCountLead(): void {
    if (!this.statistics) {
      return;
    }
    this.result = [];
    this.statistics.forEach((s) => {
      this.result.push(new Result({name: s.name, value: s.countLead}));
    });
  }

}
