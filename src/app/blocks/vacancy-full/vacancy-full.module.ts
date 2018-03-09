import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VacancyFullComponent } from "./vacancy-full.component";
import { VacancyFullService } from "./vacancy-full.service";

@NgModule({
    imports: [CommonModule],
    declarations: [VacancyFullComponent],
    exports: [VacancyFullComponent],
    providers: [VacancyFullService]
})
export class VacancyFullModule {}