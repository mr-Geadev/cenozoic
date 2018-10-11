import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { QuestionnairesApi } from 'api';
import { QuestionnaireComponent } from 'containers/questionnaire/questionnaire.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    QuestionnaireComponent
  ],
  exports: [QuestionnaireComponent],
  providers: [QuestionnairesApi]
})
export class QuestionnaireModule {
}