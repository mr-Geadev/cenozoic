import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { ListResumePageComponent } from "./list-resume-page.component";
import { FiltrSummaryesModule } from "../../blocks/filtr-summaryes/filtr-summaryes.module";
import { ListResumeModule } from "../../blocks/list-resume";
import { PageHeaderModule } from "../../blocks/header";


@NgModule({
    declarations: [
        ListResumePageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'list-resume', component:  ListResumePageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        FiltrSummaryesModule,
        ListResumeModule,
        PageHeaderModule
        // Blocks
    ],
    exports: [ ListResumePageComponent]
})
export class  ListResumePageModule {
}
