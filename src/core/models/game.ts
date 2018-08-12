import { Model } from './model';
import { Player } from './player';

export class Game extends Model {
  public gameId: string;
  public teamId: string;
  public date: string;
  public name: string;
  public players: Array<Player>;
  public isActive: boolean;

  public static init(entity: any): Game {
    return new this(entity);
  }
}

export class GameList extends Model {
  data: Array<Game>;

  constructor(data: any) {
    super(data);
    super.mapToObjects('data', GameList);
  }
}
