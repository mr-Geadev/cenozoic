import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HeaderMainComponent } from "./header-main.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [HeaderMainComponent],
    exports: [HeaderMainComponent]
})
export class HeaderMainModule {}