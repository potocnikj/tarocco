import { Model } from './model';

export class NewRound extends Model {
  public isKlop = false;
  public gameId: string;
  public leadPlayerId: string;
  public supportingPlayerId: string;
  public won: boolean;
  public gameType: number;
  public scoreDifference: number;
  public modifiers: Array<{
    modifierType: string;
    team: number;
    announced: number;
    contraFactor: number;
  }>;
  public contraFactor: number;
  public mondFangPlayerId: string;
  public pagatFangPlayerId: string;
  public klopResults: Array<{playerId: string, score: number}>;

  public static init(entity = {}): NewRound {
    return new this(entity);
  }
}
