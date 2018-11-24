import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'services';

@Injectable()
export class PaymentApi {

  constructor(private http: HttpClient,
              private userSerivce: UserService) {
  }

  buyCredential(typeInner: string, count: number): Observable<any> {
    let type = null;
    switch (typeInner) {
      case 'vacancy':
        type = 'countPossibleCreateVacancy';
        break;
      case 'banner':
        type = 'countPossibleCreateBanner';
        break;
      default:
        type = 'countPossibleViewResumeContacts';
        break;
    }

    return this.http.get(`/api/v1/user/paid-options/pay?paidOptionName=${type}&count=${count}`)
      .map(
        res => {
          this.userSerivce.getUserInfo();
        },
      );
  }

}