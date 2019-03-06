import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnairesApi, RespondsApi } from 'api';
import { RESPOND_STATUSES } from 'const';
import { QuestionnaireModel } from 'models';
import { Location } from '@angular/common';

import { ConfirmService, LocalizationService, QuestionnaireService, UserService } from 'services';

@Component({
  selector: 'questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {

  public dictionary: any = {};
  public questionnaire: QuestionnaireModel;
  public user: any;
  public id: string = null;

  public questionnaireAnswer: any[] = [];

  constructor(public userService: UserService,
              public questionnairesApi: QuestionnairesApi,
              public respondsApi: RespondsApi,
              private _confirm: ConfirmService,
              private _dialog: MatDialog,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private _location: Location,
              private questionnaireService: QuestionnaireService,
              private _localizationService: LocalizationService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    if (this.id === 'answer') {
      this.questionnaireService.questionnaire$
        .filter(questionnaire => !!questionnaire)
        .subscribe(questionnaire => {
          this.questionnaire = questionnaire;
          this.questionnaire.sections.forEach(section => {
            this.questionnaireAnswer.push(section.questions.map(question => ''));
          });
        });
    } else if (this.id === 'see-answer') {
      this.questionnaireService.questionnaire$
        .filter(questionnaire => !!questionnaire)
        .subscribe(questionnaire => {
          this.questionnaire = questionnaire;
          this.questionnaire.sections.forEach(section => {
            this.questionnaireAnswer.push(section.questions.map(question => question.answer));
          });
        });
    } else {
      this.questionnairesApi.getQuestionnaireById(this.id)
        .subscribe(
          res => {
            this.questionnaire = new QuestionnaireModel(res.questionnaire);
            this.questionnaire.sections.forEach(section => {
              this.questionnaireAnswer.push(section.questions.map(question => ''));
            });
          },
          err => this.router.navigate(['/']));
    }

    this.userService.user$
      .subscribe((user) => {
        this.user = user;
      });
  }

  public removeQuestionnaire() {
    this._confirm.confirm(this.dictionary.APPROVED_MESSAGE_DELETE)
      .subscribe((confirm) => {
        if (confirm) {
          this.questionnairesApi.removeQuestionnaire(this.id)
            .subscribe(
              res => this._location.back());
        }
        this._dialog.closeAll();
      });
  }

  public sendAnswers() {
    this.questionnairesApi.answerToData(this.questionnaireAnswer)
      .subscribe(
        (res) => { this._location.back(); },
        err => console.log(err),
      );
  }

  public setStatus(status: boolean) {
    this.respondsApi.setStatusAfterQuestionnaire(status ? RESPOND_STATUSES.APPROVED : RESPOND_STATUSES.REJECTED);
    this._location.back();
  }
}
