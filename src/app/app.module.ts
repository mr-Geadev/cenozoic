import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { APP_ID, Inject, PLATFORM_ID, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageFooterModule, PageHeaderModule } from './containers';
import { AdminGuard, BlankAccountGuard, LogInGuard, NotEmployerGuard, NotWorkerGuard } from './pages/guards';
import { ChangeCityModule, ChangeCityService } from './pop-ups/change-city';
import { ConfirmService } from './pop-ups/confirm/confirm.service';
import { AccountSettingsPageModule, CreateVacancyPageModule, ListVacancyPageModule, MainPageModule } from './pages';
import { EmailConfirmPageModule } from './pages/email-confirm-page';
import { CreateResumePageModule } from './pages/constructor-resume-page';
import { ListResumePageModule } from './pages/list-resume-page';
import { PersonalAccountPageModule } from './pages/personal-account-page';
import { ResumeFullPageModule } from './pages/resume-full-page';
import { BlankAccountService, LocalizationService, SortService, SystemMessageService, UserService } from './services';
import { VacancyFullPageModule } from './pages/vacancy-full-page';
import { ConfirmModule } from './pop-ups/confirm';
import { AuthPageModule } from './pages/auth-page';
import { CitiesService } from './services/cities.service';

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
    ListResumePageModule,
    PersonalAccountPageModule,
    ResumeFullPageModule,
    AccountSettingsPageModule,
    CreateVacancyPageModule,
    ListVacancyPageModule,
    VacancyFullPageModule,
    EmailConfirmPageModule,
    AuthPageModule,

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
    SortService,
    ConfirmService,
    BlankAccountService,
    ChangeCityService,

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
