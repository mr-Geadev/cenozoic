import { Component, Input, OnInit } from '@angular/core';
import { RespondsApi } from 'api';
import { STATUSES_INIT } from 'const/respond.constants';
import { publishReplay, refCount, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

@Component({
  selector: 'user-resume',
  templateUrl: './user-resume.component.html',
  styleUrls: ['./user-resume.component.scss'],
})
export class UserResumeComponent implements OnInit {

  moment = moment;
  STATUSES_INIT = STATUSES_INIT;

  @Input() resumeList;

  currentResumeSubject = new Subject();
  currentResumeResponse: any[] = []; // creationDate, vacancyId, employerId, history[ operation, data]
  currentResumeOffers: any[] = []; // creationDate, vacancyId, employerId, history[ operation, data]
  activeResponse: any = null;


  upload$ = this.currentResumeSubject.asObservable().pipe(
    switchMap((resume) => this.respondsApi.getRespondsForEntity(resume['_id'])),
    tap((res) => {
      this.currentResumeResponse = res['answer'].responds;
      this.currentResumeOffers = res['answer'].offers;
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
