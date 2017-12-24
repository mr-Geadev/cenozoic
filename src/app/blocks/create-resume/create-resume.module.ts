import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateResumeComponent } from "./create-resume.component";

@NgModule({
    imports: [CommonModule],
    declarations: [CreateResumeComponent],
    exports: [CreateResumeComponent]
})
export class CreateResumeModule {}