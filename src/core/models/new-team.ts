import { Model } from './model';
import { Player } from './player';

export class NewTeam extends Model {
  public name: string;
  public teamId: string;
  public passphrase: string;
  public members: Array<Player>;

  public static init(entity: any = {}): NewTeam {
    return new this(entity);
  }
}
