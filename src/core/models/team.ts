import { Model } from './model';
import { Player } from './player';

export class Team extends Model {
  public teamId: string;
  public salt: any;
  public passphrase: string;
  public teamName: string;
  public teamUserId: string;
  public members: Array<Player>;

  public static init(entity: any): Team {
    return new this(entity);
  }
}

export class TeamList extends Model {
  data: Array<Team>;

  constructor(data: any) {
    super(data);
    super.mapToObjects('data', Team);
  }
}
