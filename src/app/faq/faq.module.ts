import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FaqApi } from 'faq/faq.api';
import { FaqComponent } from 'faq/faq.component';
import { ChatModule } from 'faq/chat';
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTERS),
    MatDialogModule,

    MatFormFieldModule,
    MatSelectModule,
    ChatModule
  ],
  providers: [FaqApi],
  declarations: [
    FaqComponent,
    FormQuestionComponent,
    ListQuestionComponent
  ]
})

export class FaqModule {
}
