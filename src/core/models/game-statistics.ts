import { Model } from './model';

export class GameStatistics extends Model {
  public name: string;
  public playerId: string;
  public averagePerRound: number;
  public averagePerLead: number;
  public averagePerPrikolica: number;
  public averagePerPlayed: number;
  public maxPosScoreChange: number;
  public maxNegScoreChange: number;
  public countLead: number;
  public countPrikolica: number;
  public countPlayed: number;
  public countLeadLost: number;
  public countLeadWon: number;
  public sumScoreLost: number;
  public sumScoreWon: number;

  public static init(entity: any): GameStatistics {
    return new this(entity);
  }
}

export class GameStatisticsList extends Model {
  data: Array<GameStatistics>;

  constructor(data: any) {
    super(data);
    super.mapToObjects('data', GameStatistics);
  }
}
