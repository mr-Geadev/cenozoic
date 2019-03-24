import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AnalyticsApi } from 'api';
import { MessagesApi } from 'api/messages.api';

import { AppComponent } from 'app.component';
import { AdminGuard, BlankAccountGuard, LogInGuard, NotEmployerGuard, NotWorkerGuard } from 'guards';
import { PaymentGuards } from 'guards/payment.guards';
import {
  AboutUsPageModule,
  AccountSettingsPageModule,
  AuthPageModule, ConstructorBannerPageModule,
  CreateQuestionnairePageModule,
  CreateResumePageModule,
  CreateVacancyPageModule, EditBannerPageModule, EditNewsPageModule,
  EditQuestionnairePageModule,
  EditVacancyPageModule,
  EmailConfirmPageModule, FaqPageModule, FullBannerPageModule, ListNewsPageModule,
  ListResumePageModule,
  ListVacancyPageModule,
  MainPageModule, NewsFullPageModule,
  PersonalAccountPageModule, PrivacyPoliticsPageModule,
  QuestionnairePageModule,
  ResumeFullPageModule, ServicePageModule,
  VacancyFullPageModule,
} from 'pages';
import { ChatsPageModule } from 'pages/chats-page';
import { ConstructorNewsPageModule } from 'pages/constructor-news-page';
import { RestorePasswordPageModule } from 'pages/restore-password-page/restore-password-page.module';
import { ChangeCityModule, ChangeCityService, ConfirmModule, LoginModalModule, PayingModule } from 'pop-ups';
import { RestorePasswordService } from 'pop-ups/restore-password';
import { RestorePasswordModule } from 'pop-ups/restore-password/restore-password.module';
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
    RouterModule.forRoot(ROUTES, {scrollPositionRestoration: 'enabled'}),
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
    FullBannerPageModule,
    EditBannerPageModule,
    PrivacyPoliticsPageModule,
    AboutUsPageModule,
    ServicePageModule,
    ChatsPageModule,
    LoginModalModule,
    RestorePasswordModule,
    RestorePasswordPageModule,

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
    AnalyticsApi,
    MessagesApi,

    // Guards
    BlankAccountGuard,
    AdminGuard,
    LogInGuard,
    NotEmployerGuard,
    NotWorkerGuard,
    PaymentGuards,
    RestorePasswordService
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
