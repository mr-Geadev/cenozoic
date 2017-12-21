import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import {  ListSummaryesPageComponent } from "./list-summaryes-page.component";
import { FiltrSummaryesModule } from "../../blocks/filtr-summaryes/filtr-summaryes.module";
import { ListSummaryesModule } from "../../blocks/list-summaryes/list-summaryes.module";


@NgModule({
    declarations: [
        ListSummaryesPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'list-summaryes', component:  ListSummaryesPageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        FiltrSummaryesModule,
        ListSummaryesModule
        // Blocks
    ],
    exports: [ ListSummaryesPageComponent]
})
export class  ListSummaryesPageModule {
}
