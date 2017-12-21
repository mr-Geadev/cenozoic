import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateVacancyComponent } from "./create-vacancy.component";

@NgModule({
    imports: [CommonModule],
    declarations: [CreateVacancyComponent],
    exports: [CreateVacancyComponent]
})
export class CreateVacancyModule {}