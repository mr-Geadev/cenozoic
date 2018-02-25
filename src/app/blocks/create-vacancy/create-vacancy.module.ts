import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CreateVacancyComponent } from "./create-vacancy.component";
import { MatFormFieldModule, MatSelectModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateVacancyService } from "./create-vacancy.service";

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    declarations: [CreateVacancyComponent],
    exports: [CreateVacancyComponent],
    providers: [CreateVacancyService]
})
export class CreateVacancyModule {
}