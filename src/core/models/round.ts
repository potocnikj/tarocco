import {Model} from './model';
import { RoundResult } from './round-result';

export class Round extends Model {
   public contraFactor: number;
   public difference: number;
   public gameId: string;
   public gameType: number;
   public isKlop: boolean;
   public leadPlayerId: string;
   public mondFangPlayerId: string;
   public roundId: string;
   public roundNumber: number;
   public supportingPlayerId: string;
   public won: boolean;
   public roundResults: Array<RoundResult>;
   public isLast: boolean;


    public static init(entity: any): Round {
      return new this(entity);
    }

  public getGameType(): string {
    if (this.isKlop)
      return 'Klop';
    switch (this.gameType) {
      case 10: {
        return 'III';
      }
      case 20: {
        return 'II';
      }
      case 30: {
        return 'I';
      }
      case 40: {
        return 'S. III';
      }
      case 50: {
        return 'S. II';
      }
      case 60: {
        return 'S. I';
      }
      case 70: {
        return 'B.';
      }
      case 80: {
        return 'S. B. T.';
      }
      case 90: {
        return 'O. B.';
      }
    }
  }
}

export class RoundList extends Model {
    data: Array<Round>;

    constructor(data: any) {
        super(data);
      super.mapToObjects('data', Round);
    }
}
