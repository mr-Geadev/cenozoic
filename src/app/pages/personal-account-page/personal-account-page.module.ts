import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { FilterRespondModule, FullResumeModule, ListRespondModule, ListResumeModule, ListVacancyModule } from 'containers';
import { FilterRespondService } from 'containers/filter-respond';
import { LogInGuard } from 'guards';
import { LoginModalModule } from 'pop-ups';
import { RespondsApi } from "../../api";
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
    ListVacancyModule,
    FullResumeModule,
    ListRespondModule,
    FilterRespondModule
  ],
  providers: [RespondsApi],
  exports: [PersonalAccountPageComponent],
})
export class PersonalAccountPageModule {
}
