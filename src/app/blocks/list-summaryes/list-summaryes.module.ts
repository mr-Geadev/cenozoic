import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListSummaryesComponent } from "./list-summaryes.component";

@NgModule({
    imports: [CommonModule],
    declarations: [ListSummaryesComponent],
    exports: [ListSummaryesComponent]
})
export class ListSummaryesModule {}