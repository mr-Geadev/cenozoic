import { Component, OnInit } from '@angular/core';
import { SupportApi } from 'support/support.api';
import { SupportSocketService } from 'support/support.socket.service';

@Component({
  selector: 'faq-root',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {

  listIssue = [];

  constructor(private faqApi: SupportApi,
              private socket: SupportSocketService) {
  }

  public ngOnInit() {
    this.faqApi.getIssues();

    this.faqApi.listIssues$
      .subscribe(list => this.listIssue = list);

    this.socket.on('new-issue-comment').subscribe(
      (data) => {
        console.log('Success', data);
      },
      (error) => {
        console.log('Error', error);
      },
      () => {
        console.log('complete');
      });
  }

}
