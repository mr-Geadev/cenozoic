import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { BreadcrumbsModule, CreateResumeModule } from "../../blocks";

import { AccountSettingPageComponent } from "./account-setting-page.component"
import { WorkerSettingModule } from "../../blocks/worker-setting/worker-setting.module";
import { EmployerSettingModule } from "../../blocks/employer-setting/employer-setting.module";

@NgModule({
    declarations: [
        AccountSettingPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'setting', component: AccountSettingPageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,

        //blocks
        WorkerSettingModule,
        EmployerSettingModule
    ],
    exports: [AccountSettingPageComponent]
})
export class AccountSettingPageModule {

}
