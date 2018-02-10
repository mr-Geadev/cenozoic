import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ResumeService } from "../../services";
import { ListResumeComponent } from "./list-resume.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        ListResumeComponent
    ],
    exports: [ListResumeComponent],
    providers: [ResumeService]
})
export class ListResumeModule {
}