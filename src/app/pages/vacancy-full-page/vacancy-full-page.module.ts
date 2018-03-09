import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";

import { LoginModalModule } from "../../modals";
import { VacancyFullPageComponent } from "./vacancy-full-page.component";
import { VacancyFullModule } from "../../blocks/vacancy-full/vacancy-full.module";

@NgModule({
    declarations: [
        VacancyFullPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'vacancy/:id', component: VacancyFullPageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        LoginModalModule,

        // Blocks
        VacancyFullModule

    ],
    exports: [VacancyFullPageComponent]
})
export class VacancyFullPageModule {
}
