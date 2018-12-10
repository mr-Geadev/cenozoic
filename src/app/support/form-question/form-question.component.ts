import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'services';
import { SupportApi } from 'support/support.api';

@Component({
  selector: 'form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent implements OnInit {

  isReading = false;
  issue = {
    category: 'Сотрудничество',
    description: '',
  };
  public dictionary: any = {};

  constructor(private faqApi: SupportApi,
              private _localizationService: LocalizationService) {}

  createIssue() {
    this.faqApi.createIssue(this.issue)
      .subscribe(
        res => console.log(res),
        err => console.log(err),
      );
  }

  ngOnInit() {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }
}
