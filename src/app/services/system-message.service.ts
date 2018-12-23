import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material';
import { LocalizationService } from 'services/localization.service';

@Injectable()
export class SystemMessageService {
  public dictionary: any = {};

  constructor(private _snackBar: MatSnackBar,
              private _localizationService: LocalizationService) {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );
  }

  public info(message: string, duration: number = 2000, action: string = this.dictionary.INFO_MESSAGES_CLOSE, description?: string): void {
    this._snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'left',
      verticalPosition: 'top',
    } as MatSnackBarConfig);
  }
}
