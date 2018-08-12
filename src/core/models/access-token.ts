import { Model } from './model';
import { Team } from './team';

export class AccessToken extends Model {
  public accessToken: string;
  public team: Team;
}
