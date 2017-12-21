import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { CreateSummaryPageComponent } from "./create-summary-page.component";
import { CreateSummaryModule } from "../../blocks/create-summary/create-summary.module";
import { BreadcrumbsModule } from "../../blocks/breadcrumbs/breadcrumbs.module";


@NgModule({
    declarations: [
        CreateSummaryPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'create-summary', component: CreateSummaryPageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        CreateSummaryModule,
        BreadcrumbsModule
        // Blocks
    ],
    exports: [CreateSummaryPageComponent]
})
export class  CreateSummaryPageModule {
}
