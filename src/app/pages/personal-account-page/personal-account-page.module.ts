import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";

import { ListResumeModule, ResumeFullModule } from "../../blocks";
import { LogInGuard } from "../../guards";
import { LoginModalModule } from "../../modals";
import { PersonalAccountPageComponent } from "./personal-account-page.component";
import { ListVacancyModule } from "../../blocks/list-vacancy/list-vacancy.module";

@NgModule({
    declarations: [
        PersonalAccountPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {
                path: 'personal-account',
                component: PersonalAccountPageComponent,
                pathMatch: 'full',
                canActivate: [LogInGuard]
            },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        LoginModalModule,

        // Blocks
        ListResumeModule,
        ListVacancyModule,
        ResumeFullModule
    ],
    exports: [PersonalAccountPageComponent]
})
export class PersonalAccountPageModule {
}
