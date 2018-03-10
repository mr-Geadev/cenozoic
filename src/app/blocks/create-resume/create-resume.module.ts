import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
} from "@angular/material";
import { EditorModule } from "@tinymce/tinymce-angular";

import { BirthdayModule } from "../../common";
import { CreateResumeComponent } from "./create-resume.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        BirthdayModule,
        EditorModule
    ],
    declarations: [CreateResumeComponent],
    exports: [CreateResumeComponent]
})
export class CreateResumeModule {
}