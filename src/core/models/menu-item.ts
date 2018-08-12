import { Model } from './model';

export class MenuItem extends Model {
  public label: string;
  public list: Array<{
    label: string,
    isActive: boolean;
    link: Array<string>;
  }>;

  public static init(entity = {}): MenuItem {
    return new this(entity);
  }
}
