import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { LocalizationService, SystemMessageService } from '../services/index';
import { UserService } from '../services/user.service';

@Injectable()
export class NotWorkerGuard implements CanActivate {
  public dictionary: any = {};

  constructor(private userService: UserService,
              private router: Router,
              private _localizationService: LocalizationService,
              private _message: SystemMessageService) {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.user$
      .filter(user => !!user)
      .map(user => {
        if (this.userService.isType('worker')) {
          this._message.info(this.dictionary.INFO_MESSAGES_ACTION_NOT_SUPPORTED_YOUR_ACCOUNT_TYPE);
          this.router.navigate(['/personal-account', 'responds']);
        } else {
          return true;
        }
      });
  }
}