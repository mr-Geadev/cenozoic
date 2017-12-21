import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiltrComponent } from "./filtr.component";

@NgModule({
    imports: [CommonModule],
    declarations: [FiltrComponent],
    exports: [FiltrComponent]
})
export class FiltrModule {}