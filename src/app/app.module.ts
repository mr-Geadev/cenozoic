import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from 'app.component';
import { AdminGuard, BlankAccountGuard, LogInGuard, NotEmployerGuard, NotWorkerGuard } from 'guards';
import { PaymentGuards } from 'guards/payment.guards';
import {
  AccountSettingsPageModule,
  AuthPageModule, ConstructorBannerPageModule,
  CreateQuestionnairePageModule,
  CreateResumePageModule,
  CreateVacancyPageModule, EditNewsPageModule,
  EditQuestionnairePageModule,
  EditVacancyPageModule,
  EmailConfirmPageModule, FaqPageModule, ListNewsPageModule,
  ListResumePageModule,
  ListVacancyPageModule,
  MainPageModule, NewsFullPageModule,
  PersonalAccountPageModule,
  QuestionnairePageModule,
  ResumeFullPageModule,
  VacancyFullPageModule,
} from 'pages';
import { ConstructorNewsPageModule } from 'pages/constructor-news-page';
import { ChangeCityModule, ChangeCityService, ConfirmModule, PayingModule } from 'pop-ups';
import {
  BlankAccountService,
  CitiesService,
  ConfirmService,
  LocalizationService,
  QuestionnaireService, SocketService,
  SystemMessageService,
  UserService,
} from 'services';
import { PageFooterModule, PageHeaderModule } from './containers';
import { PopupsService } from 'services/popups.service';

const ROUTES = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AdminGuard],
  },
  {
    path: 'support',
    loadChildren: './support/support.module#SupportModule',
    canActivate: [LogInGuard],
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
    QuestionnairePageModule,
    EditQuestionnairePageModule,
    ConstructorNewsPageModule,
    NewsFullPageModule,
    ListNewsPageModule,
    EditNewsPageModule,
    FaqPageModule,
    ConstructorBannerPageModule,

    // Blocks
    PageHeaderModule,
    PageFooterModule,

    // Modals
    ChangeCityModule,
    ConfirmModule,
    PayingModule
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
    QuestionnaireService,
    SocketService,

    // Guards
    BlankAccountGuard,
    AdminGuard,
    LogInGuard,
    NotEmployerGuard,
    NotWorkerGuard,
    PaymentGuards
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
