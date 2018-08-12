import { Model } from './model';
import { Player } from './player';

export class NewGame extends Model {
  public name: string;
  public players: Array<Player>;

  public static init(entity: any): NewGame {
    return new this(entity);
  }
}
