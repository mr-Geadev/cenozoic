import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { ListVacancyModule } from "../../blocks/list-vacancy/list-vacancy.module";

import { LoginModalModule } from "../../modals";
import { ListVacancyPageComponent } from "./list-vacancy-page.component";

@NgModule({
    declarations: [
        ListVacancyPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'list-vacancy', component: ListVacancyPageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        LoginModalModule,

        // Blocks
        ListVacancyModule

    ],
    exports: [ListVacancyPageComponent]
})
export class ListVacancyPageModule {
}
