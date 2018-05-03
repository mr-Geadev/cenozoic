import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material";
import { RouterModule } from "@angular/router";

import { PageHeaderComponent } from "./page-header.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule
    ],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent]
})
export class PageHeaderModule {
}