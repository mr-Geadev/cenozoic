import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RestorePasswordService } from 'pop-ups/restore-password/restore-password.service';

import { AuthService, LocalizationService, SystemMessageService } from '../../services';

@Component({
  selector: 'restore-password-modal',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {

  public dictionary: any = {};
  public currentLang: string = null;

  public email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _dialog: MatDialog,
              private _systemMessageService: SystemMessageService,
              private _localizationService: LocalizationService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );

    this.currentLang = LocalizationService.currentLang();
  }

  restorePassword() {
    this._authService.sendLinkToRestorePassword(this.email.value)
      .subscribe(res => {
          this._systemMessageService.info('Ссылка отправлена');
          this._dialog.closeAll();
        },
        err => {
          this._systemMessageService.info('Аккаунт не найден');
        });
  }
}
