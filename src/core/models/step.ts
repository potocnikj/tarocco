import {Model} from './model';

export class Step extends Model {
    stepId: number;
    stepName: string;
    active: boolean;
    passed: boolean;

    public static init(entity = {}): Step {
      return new this(entity);
    }
}
