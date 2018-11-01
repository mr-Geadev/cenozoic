import { Component, OnInit } from '@angular/core';
import { FaqApi } from 'faq/faq.api';
import { FaqSocketService } from 'faq/faq.socket.service';

@Component({
  selector: 'faq-root',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {

  listIssue = [];

  constructor(private faqApi: FaqApi,
              private socket: FaqSocketService) {
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
