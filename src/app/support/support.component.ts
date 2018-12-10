import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'services';
import { SupportApi } from 'support/support.api';
import { SocketService } from 'services/socket.service';

@Component({
  selector: 'faq-root',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {

  listIssue = [];
  public dictionary: any = {};

  constructor(private faqApi: SupportApi,
              private _localizationService: LocalizationService,
              private socket: SocketService) {
  }

  public ngOnInit() {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );

    this.faqApi.getIssues();

    this.getIssueList();

    this.socket.on('new-issue-comment').subscribe(
      (data) => {
        console.log('Success in support', data);
        this.getIssueList();
      },
      (error) => {
        console.log('Error', error);
      },
      () => {
        console.log('complete');
      });
  }

  getIssueList() {
    this.faqApi.listIssues$
      .subscribe(list => {
        this.listIssue = list;
      });
  }

}
