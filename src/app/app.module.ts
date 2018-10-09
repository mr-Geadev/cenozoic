import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from 'app.component';
import { AdminGuard, BlankAccountGuard, LogInGuard, NotEmployerGuard, NotWorkerGuard } from 'guards';
import {
  AccountSettingsPageModule,
  AuthPageModule, CreateQuestionnairePageModule,
  CreateResumePageModule,
  CreateVacancyPageModule, EditVacancyPageModule,
  EmailConfirmPageModule,
  ListResumePageModule,
  ListVacancyPageModule,
  MainPageModule,
  PersonalAccountPageModule,
  ResumeFullPageModule,
  VacancyFullPageModule,
} from 'pages';
import { ChangeCityModule, ChangeCityService, ConfirmModule } from 'pop-ups';
import { BlankAccountService, CitiesService, ConfirmService, LocalizationService, SystemMessageService, UserService } from 'services';
import { PageFooterModule, PageHeaderModule } from './containers';
import { PopupsService } from "./services/popups.service";

const ROUTES = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AdminGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'cenozoic' }),
    RouterModule.forRoot(ROUTES),
    MatSnackBarModule,
    // Pages
    MainPageModule,
    CreateResumePageModule,
    CreateQuestionnairePageModule,
    ListResumePageModule,
    PersonalAccountPageModule,
    ResumeFullPageModule,
    AccountSettingsPageModule,
    CreateVacancyPageModule,
    ListVacancyPageModule,
    VacancyFullPageModule,
    EmailConfirmPageModule,
    AuthPageModule,
    EditVacancyPageModule,

    // Blocks
    PageHeaderModule,
    PageFooterModule,

    // Modals
    ChangeCityModule,
    ConfirmModule,

  ],
  providers: [
    HttpClient,

    // custom services
    SystemMessageService,
    LocalizationService,
    CitiesService,
    UserService,
    ConfirmService,
    BlankAccountService,
    ChangeCityService,
    PopupsService,

    // Guards
    BlankAccountGuard,
    AdminGuard,
    LogInGuard,
    NotEmployerGuard,
    NotWorkerGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }

}
