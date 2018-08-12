import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DisplayTypeEnum } from '../models/enum/display-type.enum';

@Injectable()
export class BaseService {

  constructor() {
  }
  /**
   * Returns DisplayTypeEnum based on display width
   */
  getDisplayType(): DisplayTypeEnum {
    const innerWidth = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (innerWidth < 1200) {
      return DisplayTypeEnum.Mobile;
    }

    return DisplayTypeEnum.Desktop;
  }

  isDesktopDisplay(): boolean {
    return this.getDisplayType() === DisplayTypeEnum.Desktop;
  }

  isMobileDisplay(): boolean {
    return this.getDisplayType() === DisplayTypeEnum.Mobile;
  }
}
