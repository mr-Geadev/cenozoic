import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import {
  FilterRespondModule,
  FullResumeModule, ListNewsModule,
  ListQuestionnaireModule,
  ListRespondModule,
  ListResumeModule,
  ListVacancyModule,
} from 'containers';
import { FilterRespondService } from 'containers/filter-respond';
import { LogInGuard } from 'guards';
import { LastNewsModule } from 'pages/main-page/last-news';
import { LoginModalModule, PayingModalService } from 'pop-ups';
import { QuestionnairesApi, RespondsApi } from '../../api';
import { PersonalAccountPageComponent } from './personal-account-page.component';

@NgModule({
  declarations: [
    PersonalAccountPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'personal-account',
        component: PersonalAccountPageComponent,
        pathMatch: 'full',
        canActivate: [LogInGuard],
      },
    ]),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    LoginModalModule,

    // Blocks
    ListResumeModule,
    ListQuestionnaireModule,
    ListVacancyModule,
    FullResumeModule,
    ListRespondModule,
    ListNewsModule,
    FilterRespondModule,
    LastNewsModule
  ],
  providers: [
    RespondsApi,
    QuestionnairesApi,
    PayingModalService
  ],
  exports: [PersonalAccountPageComponent],
})
export class PersonalAccountPageModule {
}
