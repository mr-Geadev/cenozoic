import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterResumesComponent } from "./filter-resumes.component";
import { FilterResumesService } from "./filter-resumes.service";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [FilterResumesComponent],
    exports: [FilterResumesComponent],
    providers: [FilterResumesService]
})

export class FilterResumesModule {

}