import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PayingModalService } from 'pop-ups/paying';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class PaymentGuards implements CanActivate {

  constructor(private userService: UserService,
              private router: Router,
              private payingModalService: PayingModalService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.user$
      .filter(user => !!user)
      .map(user => {
        const typePayment = route.data.type;

        if (user.paidOptions[typePayment]) {
          return true;
        }
        this.router.navigate(['/personal-account']);

        let modal = null;

        switch (typePayment) {
          case 'countPossibleCreateVacancy':
            modal = 'vacancy';
            break;
          case 'countPossibleCreateBanner':
            modal = 'banner';
            break;
          default:
            modal = 'resume';
            break;
        }

        this.payingModalService.openBuyModal(modal);
        return false;
      });
  }
}
