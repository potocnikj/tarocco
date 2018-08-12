import { Model } from './model';

export class Authentication extends Model {
  public teamId: string;
  public passphrase: string;

  public static init(entity: any = {teamId: '', passphrase: ''}): Authentication {
    return new this(entity);
  }
}
