import { Model } from './model';

export class Modifier extends Model {
  public modifierType: string;
  public team = 0;
  public announced = 0;
  public contraFactor = 1;

  public static init(entity: any): Modifier {
    return new this(entity);
  }
}

