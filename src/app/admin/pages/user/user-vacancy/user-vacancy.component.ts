import { Component, Input, OnInit } from '@angular/core';
import { RespondsApi } from 'api';
import { STATUSES_INIT } from 'const/respond.constants';
import { publishReplay, refCount, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

@Component({
  selector: 'user-vacancy',
  templateUrl: './user-vacancy.component.html',
  styleUrls: ['./user-vacancy.component.scss'],
})
export class UserVacancyComponent implements OnInit {

  moment = moment;
  STATUSES_INIT = STATUSES_INIT;

  @Input() vacancyList;

  currentVacancySubject = new Subject();
  currentVacancyResponse: any[] = []; // creationDate, vacancyId, employerId, history[ operation, data]
  currentVacancyOffers: any[] = []; // creationDate, vacancyId, employerId, history[ operation, data]
  activeResponse: any = null;

  upload$ = this.currentVacancySubject.asObservable().pipe(
    switchMap((resume) => this.respondsApi.getRespondsForEntity(resume['_id'])),
    tap((res) => {
      this.currentVacancyResponse = res['answer'].responds;
      this.currentVacancyOffers = res['answer'].offers;
    }), // offers: [] responds: []
    publishReplay(1),
    refCount(),
  );

  constructor(
    public respondsApi: RespondsApi,
  ) {

  }

  ngOnInit() {
  }
}
