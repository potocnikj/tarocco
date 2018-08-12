import {Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable()
export class ToastService {

  constructor(public snackBar: MatSnackBar) {
  }

  public addToast(title: string, msg: string, type: string, timeout = 5000): void {
    const config = new MatSnackBarConfig();
    config.duration = timeout;
    this.snackBar.open(msg, type, config);
  }
}
