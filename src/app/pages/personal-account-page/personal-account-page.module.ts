import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { LoginModalModule } from "../../modals/login/login.module";
import { PersonalAccountPageComponent } from "./personal-account-page.component";
import { ListResumeModule } from "../../blocks/list-resume/list-resume.module";
import { ResumeFullModule } from "../../blocks/resume-full/resume-full.module";

@NgModule({
    declarations: [
        PersonalAccountPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'personal-account', component: PersonalAccountPageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        LoginModalModule,


        //blocks
        ListResumeModule,
        ResumeFullModule

    ],
    exports: [PersonalAccountPageComponent]
})
export class  PersonalAccountPageModule {
}