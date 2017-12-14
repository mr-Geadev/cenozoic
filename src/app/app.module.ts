import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageFooterModule, PageHeaderModule } from "./blocks";
import { NotFoundPageComponent, MainPageModule } from "./pages";

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

        // Block
        PageHeaderModule,
        PageFooterModule,
    ],
    providers: [HttpClient],
    bootstrap: [AppComponent]
})
export class AppModule {
}
