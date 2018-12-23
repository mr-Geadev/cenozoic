import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from 'services/localization.service';
import { SystemMessageService } from './system-message.service';
import { UserService } from './user.service';

@Injectable()
export class BlankAccountService {

  public isProtector: boolean = false;
  public dictionary: any = {};

  constructor(private userService: UserService,
              private msg: SystemMessageService,
              private _localizationService: LocalizationService,
              private _router: Router) {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );
  }

  public goFilled(): void {
    this.msg.info(this.dictionary.INFO_MESSAGES_ADD_PERSONAL_DATA, 4000);
    this._router.navigate(['/setting']);
    this.isProtector = true;
  }

  public compleateFilled(typeAccount): void {
    this.isProtector = false;
    this.userService.getUserInfo()
      .subscribe(
        user => {
          if (typeAccount === 'worker') {
            this._router.navigate(['/create-resume']);
          } else {
            this._router.navigate(['/create-vacancy']);
          }
        },
      );
  }
}
