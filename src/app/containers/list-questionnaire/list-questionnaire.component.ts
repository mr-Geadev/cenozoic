import { Component, Input, OnInit } from '@angular/core';
import { QuestionnaireModel } from 'models';
import { LocalizationService } from 'services';

@Component({
  selector: 'list-questionnaire',
  templateUrl: './list-questionnaire.component.html',
  styleUrls: ['./list-questionnaire.component.scss'],
})
export class ListQuestionnaireComponent implements OnInit {

  @Input('typeUser') typeUser: string;
  @Input('listQuestionnaire') listQuestionnaire: QuestionnaireModel[];

  public dictionary: any = {};

  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );
  }
}
