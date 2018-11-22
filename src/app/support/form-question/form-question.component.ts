import { Component } from '@angular/core';
import { SupportApi } from 'support/support.api';

@Component({
  selector: 'form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent {

  isReading = false;
  issue = {
    category: 'Сотрудничество',
    description: ''
  }

  constructor(private faqApi: SupportApi) {}

  createIssue() {
    this.faqApi.createIssue(this.issue)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }
}
