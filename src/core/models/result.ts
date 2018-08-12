import { Model } from './model';
export class Result extends Model {
  public difference: Array<{value: number}>;
  public gameType: Array<{value: number, name: string}>;
  public contraFactor: Array<{value: number, name: string}>;
  public outcome: Array<{value: number, name: string}>;
  public isKlop: Array<{value: number, name: string}>;

  public static init(): Result {
    return new this({
      difference: [
        {value: 0},
        {value: 5},
        {value: 10},
        {value: 15},
        {value: 20},
        {value: 25},
        {value: 30},
        {value: 35}
        ],
      gameType: [
        {value: 10, name: 'III'},
        {value: 20, name: 'II'},
        {value: 30, name: 'I'},
        {value: 40, name: 'S. III'},
        {value: 50, name: 'S. II'},
        {value: 60, name: 'S. I'},
        {value: 70, name: 'Berač'},
        {value: 80, name: 'S. Brez talona'},
        {value: 90, name: 'O. Berač'}
        ],
      contraFactor: [
        {value: 1, name: 'Brez'},
        {value: 2, name: 'Kontra'},
        {value: 4, name: 'Re'},
        {value: 8, name: 'Sub'},
        {value: 16, name: 'Mort'}
      ],
      outcome: [
        {value: true, name: 'Zmaga'},
        {value: false, name: 'Poraz'},
        {value: null, name: '---'}
      ],
      isKlop: [
        {value: true, name: 'Da'},
        {value: false, name: 'Ne'}
      ]
    });
  }
}

