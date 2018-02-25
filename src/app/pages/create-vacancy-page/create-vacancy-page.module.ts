import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { CreateVacancyPageComponent } from "./create-vacancy-page.component";
import { CreateVacancyModule } from "../../blocks/create-vacancy/create-vacancy.module";


@NgModule({
    declarations: [
        CreateVacancyPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'create-vacancy', component: CreateVacancyPageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        // Blocks
        CreateVacancyModule
    ],
    exports: [CreateVacancyPageComponent]
})
export class CreateVacancyPageModule {
}
