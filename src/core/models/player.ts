import { Model } from './model';

export class Player extends Model {
  public playerId: string;
  public name: string;
  public GameId: string;
  public active: boolean;
  public klopResult: number;

  public static init(entity: any): Player {
    return new this(entity);
  }
}

export class PlayerList extends Model {
  data: Array<Player>;

  constructor(data: any) {
    super(data);
    super.mapToObjects('data', Player);
  }
}
