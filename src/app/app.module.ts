import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageFooterModule, PageHeaderModule } from "./blocks";
import { CreateResumeGuard } from "./guards";
import { ChangeCityModalModule } from "./modals/change-city";
import {
    AccountSettingPageModule,
    CreateVacancyPageModule,
    ListVacancyPageModule,
    MainPageModule,
    NotFoundPageComponent
} from "./pages";
import { CreateResumePageModule } from "./pages/create-resume-page";
import { ListResumePageModule } from "./pages/list-resume-page";
import { PersonalAccountPageModule } from "./pages/personal-account-page";
import { ResumeFullPageModule } from "./pages/resume-full-page";
import { LocalizationService, SystemMessageService, UserService } from "./services";
import { VacancyFullPageModule } from "./pages/vacancy-full-page/vacancy-full-page.module";

const ROUTES = [
    //{ path: '**', redirectTo: '/' }
];

@NgModule({
    declarations: [
        AppComponent,
        NotFoundPageComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'my-app' }),
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

        // Blocks
        PageHeaderModule,
        PageFooterModule,

        // Modals
        ChangeCityModalModule,

    ],
    providers: [
        HttpClient,
        SystemMessageService,
        LocalizationService,
        UserService,

        //Guards
        CreateResumeGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
