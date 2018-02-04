import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";

import { LastAddedModule, LastNewsModule, MainBannerModule, MainContentModule, MainPartnersModule } from "../../blocks";
import { LoginModalModule } from "../../modals";
import { MainPageComponent } from "./main-page.component";

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
        LoginModalModule,

        // Blocks
        LastAddedModule,
        LastNewsModule,
        MainBannerModule,
        MainContentModule,
        MainPartnersModule,
    ],
    exports: [MainPageComponent]
})
export class MainPageModule {
}
