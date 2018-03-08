import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageFooterModule, PageHeaderModule } from "./blocks";
import { ChangeCityModalModule } from "./modals/change-city";
import { MainPageModule, NotFoundPageComponent } from "./pages";
import { CreateResumePageModule } from "./pages/create-resume-page";
import { ListResumePageModule } from "./pages/list-resume-page";
import { PersonalAccountPageModule } from "./pages/personal-account-page";
import { ResumeFullPageModule } from "./pages/resume-full-page";
import { SystemMessageService } from "./services";
import { AccountSettingPageModule } from "./pages/account-setting-page/account-setting-page.module";
import { CreateResumeGuard } from "./guards/create-resume.guards";
import { UserService } from "./services/user.service";
import { CreateVacancyPageModule } from "./pages/create-vacancy-page/create-vacancy-page.module";
import { ListVacancyPageModule } from "./pages/list-vacancy-page/list-vacancy-page.module";

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

        // Blocks
        PageHeaderModule,
        PageFooterModule,

        // Modals
        ChangeCityModalModule,

    ],
    providers: [
        HttpClient,
        SystemMessageService,
        UserService,

        //Guards
        CreateResumeGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
