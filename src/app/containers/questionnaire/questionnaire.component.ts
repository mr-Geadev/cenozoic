import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnairesApi } from 'api';
import { QuestionnaireModel } from 'models';

import { ConfirmService, LocalizationService, UserService } from 'services';

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
              private _confirm: ConfirmService,
              private _dialog: MatDialog,
              private activateRoute: ActivatedRoute,
              private router: Router,
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
      });
  }

  public removeQuestionnaire() {
    this._confirm.confirm('Вы действительно хотите удалить?')
      .subscribe((confirm) => {
        if (confirm) {
          this.questionnairesApi.removeQuestionnaire(this.id)
            .subscribe(
              res => this.router.navigate(['/personal-account']));
        }
        this._dialog.closeAll();
      });
  }
}
