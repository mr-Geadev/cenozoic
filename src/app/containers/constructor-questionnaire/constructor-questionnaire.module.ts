import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConstructorQuestionnaireComponent } from './constructor-questionnaire.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ConstructorQuestionnaireComponent],
  exports: [ConstructorQuestionnaireComponent]
})
export class ConstructorQuestionnaireModule {
}
