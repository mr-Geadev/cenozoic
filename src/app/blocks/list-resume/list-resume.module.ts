import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListResumeComponent } from "./list-resume.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        ListResumeComponent
    ],
    exports: [ListResumeComponent]
})
export class ListResumeModule {}