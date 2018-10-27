import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnswerTopQuestionnaireFileComponent } from './answer-top-questionnaire-file.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AnswerTopQuestionnaireFileComponent],
  entryComponents: [AnswerTopQuestionnaireFileComponent],
  providers: [],
  exports: [AnswerTopQuestionnaireFileComponent]
})
export class AnswerTopQuestionnaireFileModule {
}
