import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateResumeComponent } from "./create-resume.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [CreateResumeComponent],
    exports: [CreateResumeComponent]
})
export class CreateResumeModule {}