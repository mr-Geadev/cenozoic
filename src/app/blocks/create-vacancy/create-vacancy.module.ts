import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatFormFieldModule, MatSelectModule } from "@angular/material";
import { EditorModule } from "@tinymce/tinymce-angular";

import { CreateVacancyComponent } from "./create-vacancy.component";
import { CreateVacancyService } from "./create-vacancy.service";

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        EditorModule,
        MatButtonModule
    ],
    declarations: [CreateVacancyComponent],
    exports: [CreateVacancyComponent],
    providers: [CreateVacancyService]
})
export class CreateVacancyModule {
}