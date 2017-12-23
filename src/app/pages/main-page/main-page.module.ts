import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { MainPageComponent } from "./main-page.component";
import { LastAddedModule } from "../../blocks/last-added/last-added.module";
import { LastNewsModule } from "../../blocks/last-news/last-news.module";
import { MainBannerModule } from "../../blocks/main-banner/main-banner.module";
import { MainContentModule } from "../../blocks/main-content/main-content.module";
import { MainPartnersModule } from "../../blocks/main-partners/main-partners.module";
import { HeaderMainModule } from "../../blocks/header-main/header-main.module";

@NgModule({
    declarations: [
        MainPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', component: MainPageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        LastAddedModule,
        LastNewsModule,
        MainBannerModule,
        MainContentModule,
        MainPartnersModule,
        HeaderMainModule
        // Blocks
    ],
    exports: [MainPageComponent]
})
export class  MainPageModule {
}
