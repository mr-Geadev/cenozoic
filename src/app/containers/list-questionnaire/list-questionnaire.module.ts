import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from 'blocks';
import { ListQuestionnaireComponent } from './list-questionnaire.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
  ],
  declarations: [
    ListQuestionnaireComponent,
  ],
  exports: [ListQuestionnaireComponent],
})
export class ListQuestionnaireModule {
}
