import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LastNewsComponent } from "./last-news.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [LastNewsComponent],
    exports: [LastNewsComponent]
})
export class LastNewsModule {
}