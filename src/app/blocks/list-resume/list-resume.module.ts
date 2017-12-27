import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListResumeComponent } from "./list-resume.component";

@NgModule({
    imports: [CommonModule],
    declarations: [
        ListResumeComponent
    ],
    exports: [ListResumeComponent]
})
export class ListResumeModule {}