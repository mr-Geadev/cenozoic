import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageFooterModule, PageHeaderModule } from "./blocks";
import { NotFoundPageComponent, MainPageModule } from "./pages";
import { CreateResumePageModule } from "./pages/create-resume-page/create-resume-page.module";
import { ListResumePageModule } from "./pages/list-resume-page/list-resume-page.module";
import { PersonalAccountPageModule } from "./pages/personal-account-page/personal-account-page.module";
import { ResumeFullPageModule } from "./pages/resume-full-page/resume-full-page.module";

const ROUTES = [
    //{ path: '**', redirectTo: '/' }
];

@NgModule({
    declarations: [
        AppComponent,
        NotFoundPageComponent
    ],
    imports: [
        NoopAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'my-app' }),
        RouterModule.forRoot(ROUTES),
        // Pages
        MainPageModule,
        CreateResumePageModule,
        ListResumePageModule,
        PersonalAccountPageModule,
        ResumeFullPageModule,

        // Block
        PageHeaderModule,
        PageFooterModule,
    ],
    providers: [HttpClient],
    bootstrap: [AppComponent]
})
export class AppModule {

}
