import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FaqComponent } from 'faq/faq.component';
import { FormQuestionComponent } from './form-question';
import { ListQuestionComponent } from './list-question';

const ROUTERS = [
  {
    path: '',
    component: FaqComponent,
    children: [],
  },

];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTERS),

    MatFormFieldModule,
    MatSelectModule,
  ],
  declarations: [
    FaqComponent,
    FormQuestionComponent,
    ListQuestionComponent
  ]
})

export class FaqModule {
}
