import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListResumeComponent } from "./list-resume.component";
import { RouterModule } from "@angular/router";
import { ResumeService } from "../../services/resume.service";

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
export class ListResumeModule {}