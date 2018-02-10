import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { BreadcrumbsModule, CreateResumeModule } from "../../blocks";

import { CreateResumePageComponent } from "./create-resume-page.component";

@NgModule({
    declarations: [
        CreateResumePageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'create-resume', component: CreateResumePageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        CreateResumeModule,
        BreadcrumbsModule,
        // Blocks
    ],
    exports: [CreateResumePageComponent]
})
export class CreateResumePageModule {
}
