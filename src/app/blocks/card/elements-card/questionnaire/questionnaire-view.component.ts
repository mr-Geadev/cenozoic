import { Component, Input, OnInit } from '@angular/core';
import { QuestionnaireModel } from 'models';

@Component({
  selector: 'questionnaire-view',
  templateUrl: './questionnaire-view.component.html',
  styleUrls: ['./questionnaire-view.component.scss'],
})
export class QuestionnaireViewComponent implements OnInit {

  @Input('dictionary') dictionary: any;
  @Input('questionnaire') questionnaire: QuestionnaireModel;

  public experienceTime: string = null;

  constructor() {
  }

  ngOnInit() {
  }
}
