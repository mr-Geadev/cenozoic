import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SupportApi {

  private listIssues: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public listIssues$: Observable<any> = this.listIssues.asObservable();

  private setListIssues(list: any[]): void {
    this.listIssues.next(list);
  }

  constructor(private http: HttpClient) {
  }

  public createIssue(issue): Observable<any> {
    return this.http.post('/api/v1/support/issue/create', { issue })
      .map( (res) => this.getIssues());
  }

  public getIssues() {
    this.http.get('/api/v1/support/issue/get/all')
      .subscribe(
        res => {
          this.setListIssues(res['issueList']);
        },
        err => console.log(err),
      );
  }

  public getOneIssue(id: string) {
    return this.http.get(`/api/v1/support/issue/get/one?issueId=${id}`);
  }

  public sendMessage(issueId: string, comment: string) {
    return this.http.post(`/api/v1/support/issue/comment/create`, { issue: { issueId, comment}} );
  }
}
