import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListVacancyComponent } from "./list-vacancy.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [ListVacancyComponent],
    exports: [ListVacancyComponent]
})
export class ListVacancyModule {
}