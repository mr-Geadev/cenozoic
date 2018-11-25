import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuestionnairesApi } from 'api';
import { QuestionnaireComponent } from 'containers/questionnaire/questionnaire.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    QuestionnaireComponent,
  ],
  exports: [QuestionnaireComponent],
  providers: [QuestionnairesApi],
})
export class QuestionnaireModule {
}