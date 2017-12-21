import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateSummaryComponent } from "./create-summary.component";

@NgModule({
    imports: [CommonModule],
    declarations: [CreateSummaryComponent],
    exports: [CreateSummaryComponent]
})
export class CreateSummaryModule {}