import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { QuestionnairesApi } from 'api';
import { QuestionnaireModel } from 'models';
import { ConfirmService } from 'services';

@Component({
  selector: 'questionnaire-view',
  templateUrl: './questionnaire-view.component.html',
  styleUrls: ['./questionnaire-view.component.scss'],
})
export class QuestionnaireViewComponent implements OnInit {

  @Input('dictionary') dictionary: any;
  @Input('questionnaire') questionnaire: QuestionnaireModel;

  public experienceTime: string = null;

  constructor(public questionnairesApi: QuestionnairesApi,
              private _confirm: ConfirmService,
              private _dialog: MatDialog) {
  }

  ngOnInit() {
  }

  public removeQuestionnaire() {
    this._confirm.confirm('Вы действительно хотите удалить?')
      .subscribe((confirm) => {
        if (confirm) {
          this.questionnairesApi.removeQuestionnaire(this.questionnaire._id)
            .subscribe();
        }
        this._dialog.closeAll();
      });
  }
}
