import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionnairesApi } from 'api';
import { QuestionnaireModule } from 'containers/questionnaire/questionnaire.module';
import { QuestionnaireModel } from 'models';

import { LocalizationService, UserService } from 'services';

@Component({
  selector: 'questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {

  public dictionary: any = null;
  public questionnaire: QuestionnaireModel;
  public user: any;
  public id: string = null;

  constructor(public userService: UserService,
              public questionnairesApi: QuestionnairesApi,
              private activateRoute: ActivatedRoute,
              private _localizationService: LocalizationService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;

    this.questionnairesApi.getQuestionnaireById(this.id)
      .subscribe(
        res => this.questionnaire = new QuestionnaireModel(res.questionnaire));

    this.userService.user$
      .subscribe((user) => {
        this.user = user;
      })
  }
}
