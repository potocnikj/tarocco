import { Model } from './model';

export class PlayerScore extends Model {
  public score: number;
  public radelcCount: number;
  public usedRadelcCount: number;

  public static init(entity: any): PlayerScore {
    return new this(entity);
  }
}

export class PlayerList extends Model {
  data: Array<PlayerScore>;

  constructor(data: any) {
    super(data);
    super.mapToObjects('data', PlayerScore);
  }
}
