import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatSnackBarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {PageFooterModule, PageHeaderModule} from './blocks';
import {AdminGuard, BlankAccountGuard, LogInGuard, NotEmployerGuard, NotWorkerGuard} from './guards';
import {ChangeCityModalModule} from './modals/change-city';
import {ConfirmService} from './modals/confirm/confirm.service';
import {AccountSettingPageModule, CreateVacancyPageModule, ListVacancyPageModule, MainPageModule, NotFoundPageComponent} from './pages';
import {AccountEmailConfirmPageModule} from './pages/account-email-confirm-page';
import {CreateResumePageModule} from './pages/constructor-resume-page';
import {ListResumePageModule} from './pages/list-resume-page';
import {PersonalAccountPageModule} from './pages/personal-account-page';
import {ResumeFullPageModule} from './pages/resume-full-page';
import {BlankAccountService, LocalizationService, SortService, SystemMessageService, UserService} from './services';
import {VacancyFullPageModule} from './pages/vacancy-full-page';
import {ConfirmModule} from './modals/confirm';
import {AuthPageModule} from './pages/auth-page';

const ROUTES = [
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canActivate: [AdminGuard]
    },
    {path: '**', redirectTo: '/'}
];

@NgModule({
    declarations: [
        AppComponent,
        NotFoundPageComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({appId: 'my-app'}),
        RouterModule.forRoot(ROUTES),
        MatSnackBarModule,
        // Pages
        MainPageModule,
        CreateResumePageModule,
        ListResumePageModule,
        PersonalAccountPageModule,
        ResumeFullPageModule,
        AccountSettingPageModule,
        CreateVacancyPageModule,
        ListVacancyPageModule,
        VacancyFullPageModule,
        AccountEmailConfirmPageModule,
        AuthPageModule,

        // Blocks
        PageHeaderModule,
        PageFooterModule,

        // Modals
        ChangeCityModalModule,
        ConfirmModule

    ],
    providers: [
        HttpClient,

        // custom services
        SystemMessageService,
        LocalizationService,
        UserService,
        SortService,
        ConfirmService,
        BlankAccountService,

        //Guards
        BlankAccountGuard,
        AdminGuard,
        LogInGuard,
        NotEmployerGuard,
        NotWorkerGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
