import { Component, OnInit } from '@angular/core';
import { FaqApi } from 'faq/faq.api';

@Component({
  selector: 'faq-root',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {

  listIssue = [];

  constructor(private faqApi: FaqApi) {
  }

  public ngOnInit() {
    this.faqApi.getIssues();

    this.faqApi.listIssues$
      .subscribe(list => this.listIssue = list);
  }

}
