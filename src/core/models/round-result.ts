import { Model } from './model';
import { Player } from './player';

export class RoundResult extends Model {
  public roundId: string;
  public GameId: string;
  public playerId: string;
  public playerRadelcCount: number;
  public playerRadelcUsed: number;
  public playerScore: number;
  public roundScoreChange: number;
  public player: Player;
  public radelci: Array<boolean>;

  public static init(entity: any): RoundResult {
    return new this(entity);
  }
}

export class RoundResultList extends Model {
  data: Array<RoundResult>;

  constructor(data: any) {
    super(data);
    super.mapToObjects('data', RoundResult);
  }
}
