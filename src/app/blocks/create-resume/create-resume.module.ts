import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule } from "@angular/material";

import { BirthdayModule } from "../../common/birthday/birthday.module";
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
        BirthdayModule
    ],
    declarations: [CreateResumeComponent],
    exports: [CreateResumeComponent]
})
export class CreateResumeModule {
}