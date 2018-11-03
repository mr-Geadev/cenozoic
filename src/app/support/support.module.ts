import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SupportApi } from 'support/support.api';
import { SupportComponent } from 'support/support.component';
import { ChatModule } from 'support/chat';
import { SupportSocketService } from 'support/support.socket.service';
import { FormQuestionComponent } from './form-question';
import { ListQuestionComponent } from './list-question';

const ROUTERS = [
  {
    path: '',
    component: SupportComponent,
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
  providers: [SupportApi, SupportSocketService],
  declarations: [
    SupportComponent,
    FormQuestionComponent,
    ListQuestionComponent
  ]
})

export class SupportModule {
}
