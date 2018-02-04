import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LastAddedComponent } from "./last-added.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [LastAddedComponent],
    exports: [LastAddedComponent]
})
export class LastAddedModule {
}