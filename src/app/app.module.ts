import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageFooterModule, PageHeaderModule } from "./blocks";
import { NotFoundPageComponent, MainPageModule } from "./pages";
import { CreateSummaryPageModule } from "./pages/create-summary-page/create-summary-page.module";
import { ListSummaryesPageModule } from "./pages/list-summaryes-page/list-summaryes-page.module";

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
        CreateSummaryPageModule,
        ListSummaryesPageModule,

        // Block
        PageHeaderModule,
        PageFooterModule,
    ],
    providers: [HttpClient],
    bootstrap: [AppComponent]
})
export class AppModule {
}
